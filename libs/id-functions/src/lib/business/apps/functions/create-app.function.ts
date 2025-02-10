import { CreateAppResource } from "@scalex-africa/types";
import { notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { saveAppToDb, validateAppForCreation } from "./helpers";

type CreateAppArgs = {
	payload: {
		body: typeof CreateAppResource.body,
	}
}

export async function createApp( args: CreateAppArgs ): Promise<typeof CreateAppResource.response> {
	try {
		await validateAppForCreation( args.payload.body );
		return notifyClientOfSuccess( {
			data: await saveAppToDb( args.payload.body ),
		} );
	} catch ( error ) {
		console.log( error );
		throwScalexError( error );
	}
}
