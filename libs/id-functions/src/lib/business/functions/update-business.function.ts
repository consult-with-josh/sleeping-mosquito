import { UpdateBusinessResource } from "@scalex-africa/types";
import { updateBusinessInDb, validateBusinessForUpdate } from "./helpers";
import { notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";

type UpdateBusinessArgs = {
    payload: {
        query: typeof UpdateBusinessResource.query,
        body: typeof UpdateBusinessResource.body,
    }
}

export async function updateBusiness( args: UpdateBusinessArgs )
: Promise<typeof UpdateBusinessResource.response> {
	try {
		await validateBusinessForUpdate( args.payload.body );
		return notifyClientOfSuccess( {
			data: await updateBusinessInDb( args.payload.query.id, args.payload.body ),
		} );
	} catch ( error ) {
		throwScalexError( error );
	}
} 