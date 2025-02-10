import { CreateAppResource, UpdateAppResource } from "@scalex-africa/types";
import { GenericErrors } from "@scalex-api/api-resources";
import { App } from "@scalex-api/db";

export async function validateAppForCreation( payload: typeof CreateAppResource.body ) {
	const appWithExistingName = await App.model.findOne( { name: payload.name } );
	if ( appWithExistingName ) {
		throw GenericErrors.duplicateResource( 'App name' );
	}
}

export async function validateAppForUpdate( payload: typeof UpdateAppResource.body ) {
	if ( payload.name ) {
		const appWithExistingName = await App.model.findOne( { name: payload.name } );
		if ( appWithExistingName ) {
			throw GenericErrors.duplicateResource( 'App name' );
		}
	}
}
