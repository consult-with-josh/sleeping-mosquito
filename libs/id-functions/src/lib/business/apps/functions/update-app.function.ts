import { UpdateAppResource } from "@scalex-africa/types";
import { notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { updateAppInDb, validateAppForUpdate } from "./helpers";

type UpdateAppArgs = {
    payload: {
        query: typeof UpdateAppResource.query,
        body: typeof UpdateAppResource.body,
    }
}

export async function updateApp( args: UpdateAppArgs )
: Promise<typeof UpdateAppResource.response> {
	try {
		await validateAppForUpdate( args.payload.body );
		return notifyClientOfSuccess( {
			data: await updateAppInDb( args.payload.query.id, args.payload.body ),
		} );
	} catch ( error ) {
		throwScalexError( error );
	}
} 