import { GetBusinessResource, GenericErrors } from "@scalex-africa/types";
import { notifyClientOfSuccess } from "@scalex-api/api-resources";
import { Business } from "@scalex-api/db";

type GetBusinessArgs = {
    payload: {
        query: typeof GetBusinessResource.query,
    }
}

export async function getBusiness( args: GetBusinessArgs )
: Promise<typeof GetBusinessResource.response> {
	try {
		return notifyClientOfSuccess( {
			data: await Business.model.findById( args.payload.query.id ),
		} );
	} catch ( error ) {
		throw GenericErrors.resourceNotFound( 'Business' );
	}
} 