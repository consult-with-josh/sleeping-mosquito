import { App, AppCredential } from '@scalex-api/db';
import { AvailableAppCredClaims, AppCredType, IAppCredential, GenericErrors, IAppCredentialCredential, IApp, ScxRequest } from '@scalex-africa/types';
import { NextFunction, Response } from 'express';
import { AcceptedHeaders } from '../functions';
import { compareSync } from 'bcrypt';
import { HttpStatusCode } from 'axios';

function extractHeaders( req: ScxRequest ) {
	return [
		req.headers[AcceptedHeaders.AppId] as string,
		req.headers[AcceptedHeaders.PublishableKey] as string,
		req.headers[AcceptedHeaders.SecretKey] as string,
	];
}

async function fetchCredentials( appId: string, secretKey?: string, publishableKey?: string )
: Promise<{
	credential: IAppCredentialCredential,
	app: IApp
}> {
	const app = await findAppByAccountId( appId );
	const appCredential = await AppCredential.model.findOne( { app: app._id } );

	if ( !appCredential ) {
		throw GenericErrors.invalidRequest( 'Invalid credentials.' );
	}

	const credential = secretKey
		? findCredentialsWithSecretKey( appCredential, secretKey )
		: findCredentialsWithPublishableKey( appCredential, publishableKey );

	if ( !credential ) {
		throw GenericErrors.invalidRequest( 'Invalid credentials.' );
	}

	return {
		app, credential
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleValidationError( error: any, res: Response ) {
	res.status( error.statusCode ?? HttpStatusCode.InternalServerError ).json(
		error.statusCode ?
			( error.error ?? error ) :
			GenericErrors.internalServerError( 'Could not validate app credentials.' )
	);
}

function validateKeys(
	appId: string,
	publishableKey: string,
	secretKey: string
) {
	if ( publishableKey && secretKey ) {
		throw GenericErrors.invalidRequest( 'Both publishableKey and secretKey cannot be provided. Please provide only one.' );
	}

	if ( !appId || ( !publishableKey && !secretKey ) ) {
		throw GenericErrors.invalidRequest( 'Missing appId and/or API key.' );
	}

	return null;
}

export async function findApp( appId: string ): Promise<IAppCredential> {
	const app = ( await App.model.findById( appId ) );
	if ( !app ) {
		throw GenericErrors.invalidRequest( 'Invalid app id.' );
	}
	return app;
}

export async function findAppByAccountId( accountId: string ): Promise<IAppCredential> {
	const app = ( await App.model.findOne( { accountId } ) );
	if ( !app ) {
		throw GenericErrors.invalidRequest( 'Invalid app id.' );
	}
	return app;
}


function findCredentialsWithSecretKey( credentials: IAppCredential, secretKey: string )
: IAppCredentialCredential {
	const secretKeys = credentials.credentials.filter( c => c.type === AppCredType.secretKey );
	const validSecretKeyCred = secretKeys.find( c => compareSync( secretKey, c.value ) );
	if ( !validSecretKeyCred ) {
		throw GenericErrors.invalidRequest( 'Invalid secret key.' );
	}
	return validSecretKeyCred;
}

function findCredentialsWithPublishableKey( credentials: IAppCredential, publishableKey: string )
: IAppCredentialCredential {
	const publishableKeys = credentials.credentials.filter( c => c.type === AppCredType.publishableKey );
	const validPublishableKeyCred = publishableKeys.find( c => c.value === publishableKey );
	if ( !validPublishableKeyCred ) {
		throw GenericErrors.invalidRequest( 'Invalid publishable credentials.' );
	}
	return validPublishableKeyCred;
}

function hasValidClaims(
	credentials: IAppCredentialCredential,
	requiredClaims: AvailableAppCredClaims | AvailableAppCredClaims[]
) {
	const claims = Array.isArray( requiredClaims )
		? requiredClaims
		: [requiredClaims];
	return claims.every( ( claim ) => credentials.claims.includes( claim ) );
}

export function validateAppCredentials(
	requiredClaims: AvailableAppCredClaims | AvailableAppCredClaims[]
) {
	return async ( req: ScxRequest, res: Response, next: NextFunction ) => {
		try {
			const [ appId, publishableKey, secretKey ] = extractHeaders( req );
			const validationError = validateKeys( appId, publishableKey, secretKey );
			if ( validationError ) return res.status( validationError.statusCode ).json( validationError );

			const credentials = await fetchCredentials( appId, secretKey, publishableKey );

			if ( !hasValidClaims( credentials.credential, requiredClaims ) ) {
				throw GenericErrors.invalidRequest( 'Insufficient permissions for the requested operation.' );
			}

			req.appCredentials = {
				appId: credentials.app._id.toString(),
				businessId: credentials.app.business.toString(),
			};
			next();
		} catch ( error ) {
			handleValidationError( error, res );
		}
	};
}
