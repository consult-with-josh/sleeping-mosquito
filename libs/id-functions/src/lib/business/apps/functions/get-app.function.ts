import { GetAppResource } from "@scalex-africa/types";
import { notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { App } from "@scalex-api/db";

type GetAppArgs = {
    payload: {
        query: typeof GetAppResource.query,
    }
}

export async function getApp( args: GetAppArgs )
: Promise<typeof GetAppResource.response> {
	try {
		console.log( args.payload.query );
		return notifyClientOfSuccess( {
			data: await App.model.findById( args.payload.query.id ),
		} );
	} catch ( error ) {
		throwScalexError( error );
	}
}