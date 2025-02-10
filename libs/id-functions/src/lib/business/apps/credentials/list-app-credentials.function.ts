import { IAppCredentialCredential, ListAppCredentialsResource } from "@scalex-africa/types";
import { GenericErrors, notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { App, AppCredential } from "@scalex-api/db";
import { credentialShouldEncrypt } from "./credential-config.constants";

type ListAppCredentialsArgs = {
	payload: {
		query: typeof ListAppCredentialsResource.query
	}
}

const modifyCredentials = ( credentials: Array<IAppCredentialCredential> ) => {
	const modified = [];
	for ( const c of credentials ) {
		if ( credentialShouldEncrypt[c.type] ) {
			modified.push( {
				name: c.name,
				type: c.type,
				firstFour: c.firstFour,
				claims: c.claims,
				value: c.firstFour + ( '*' ).repeat( 9 )
			} );
		} else {
			modified.push( c );
		}
	}
	return modified;
};

export async function listAppCredentials(
	args: ListAppCredentialsArgs
): Promise<typeof ListAppCredentialsResource.response> {
	try {
		const { query } = args.payload;
		const app = await App.model.findById( query.id );
		if ( !app ) throw GenericErrors.resourceNotFound( 'app' );
		const credentials = await AppCredential.model.findOne( { app: query.id } );

		if ( !credentials ) return notifyClientOfSuccess( { data: { credentials: [] } } );

		const modifiedCredentials = modifyCredentials( credentials.credentials );
		return notifyClientOfSuccess( { data: { credentials: modifiedCredentials } } );
	} catch ( error ) {
		throwScalexError( error );
	}
}
