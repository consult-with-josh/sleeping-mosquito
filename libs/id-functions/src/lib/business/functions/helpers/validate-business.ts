import { CreateBusinessResource, UpdateBusinessResource } from "@scalex-africa/types";
import { GenericErrors } from "@scalex-api/api-resources";
import { Business } from "@scalex-api/db";

export async function validateBusinessForCreation( payload: typeof CreateBusinessResource.body ) {
	const businessWithExistingEmail = await Business.model.findOne( { email: payload.email } );
	if ( businessWithExistingEmail ) {
		throw GenericErrors.duplicateResource( 'Business email' );
	}
}

export async function validateBusinessForUpdate( payload: typeof UpdateBusinessResource.body ) {
	if ( payload.email ) {
		const businessWithExistingEmail = await Business.model.findOne( { email: payload.email } );
		if ( businessWithExistingEmail ) {
			throw GenericErrors.duplicateResource( 'Business email' );
		}
	}
}