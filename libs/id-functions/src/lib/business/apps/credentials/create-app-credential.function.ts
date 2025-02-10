import { CreateAppCredentialsConfigResource, GenericErrors, IAppCredential } from "@scalex-africa/types";
import { generateRandomStringWithLength, notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { App, AppCredential } from "@scalex-api/db";
import { hashSync } from 'bcrypt';
import { credentialAllowedClaims, credentialNeedsGeneration,
	credentialShouldEncrypt,
	credentialShouldHaveFirstFour,
	credentialTypeLength,
	credentialTypePrefix
} from "./credential-config.constants";
import { HydratedDocument, Types } from "mongoose";

type CreateAppCredentialArgs = {
	payload: {
		body: typeof CreateAppCredentialsConfigResource.body,
	}
}

async function findApp( appId: string ) {
	const app = await App.model.findById( appId );
	if ( !app ) throw GenericErrors.resourceNotFound( 'app' );
	return app;
}

function validateClaims( claims: string[], type: string ) {
	for ( const claim of claims ) {
		if ( !credentialAllowedClaims[type].includes( claim ) ) {
			throw GenericErrors.invalidRequest( 'Some of the provided claims are not allowed for this credential type' );
		}
	}
}

async function getOrCreateCredential( appId: string, business: Types.ObjectId ) {
	let credential = await AppCredential.model.findOne( { app: appId } );
	if ( !credential ) {
		credential = await AppCredential.model.create( {
			app: appId,
			business: business,
			credentials: []
		} );
	}
	return credential;
}

function generateCredentialValue( type: string, value: string ) {
	if ( credentialNeedsGeneration[type] ) {
		return credentialTypePrefix[type] + generateRandomStringWithLength( credentialTypeLength[type] );
	}
	return value;
}

function hashCredentialIfNeeded( type: string, value: string ) {
	if ( credentialShouldEncrypt[type] ) {
		return hashSync( value, 10 );
	}
	return value;
}

function checkExistingCredential( credential: IAppCredential, name: string ) {
	const existingCredential = credential.credentials.find( cred => cred.name === name );
	if ( existingCredential ) {
		throw GenericErrors.invalidRequest( 'A credential with this name already exists.' );
	}
}

function getFirstFourIfNeeded( type: string, newCred: string ) {
	return credentialShouldHaveFirstFour[type] ? newCred.substring( 0, 4 ) : undefined;
}

async function addCredentialToApp(
	credential: HydratedDocument<IAppCredential>,
	body: typeof CreateAppCredentialsConfigResource.body,
	firstFour: string,
	hashedCred: string
) {
	credential.credentials.push( {
		type: body.type,
		name: body.name,
		firstFour,
		claims: body.claims,
		value: hashedCred,
	} );

	await credential.save();
}

function createSuccessResponse( body, newCred: string ) {
	return {
		data: {
			credential: {
				type: body.type,
				name: body.name,
				claims: body.claims,
				value: newCred,
			}
		}
	};
}

export async function createAppCredential(
	args: CreateAppCredentialArgs
): Promise<typeof CreateAppCredentialsConfigResource.response> {
	try {
		const app = await findApp( args.payload.body.app );
		validateClaims( args.payload.body.claims, args.payload.body.type );

		const credential = await getOrCreateCredential( app.id, app.business );
		checkExistingCredential( credential, args.payload.body.name );

		const newCred = generateCredentialValue( args.payload.body.type, args.payload.body.value );
		const firstFour = getFirstFourIfNeeded( args.payload.body.type, newCred );

		const hashedCred = hashCredentialIfNeeded( args.payload.body.type, newCred );

		await addCredentialToApp( credential, args.payload.body, firstFour, hashedCred );

		return notifyClientOfSuccess( createSuccessResponse( args.payload.body, newCred ) );
	} catch ( error ) {
		console.log( error );
		throwScalexError( error );
	}
}
