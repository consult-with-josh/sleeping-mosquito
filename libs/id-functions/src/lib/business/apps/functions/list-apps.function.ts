import { ListAppsResource, calculatePagination } from "@scalex-africa/types";
import { notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { App } from "@scalex-api/db";

type ListAppsArgs = {
    payload: {
        query: typeof ListAppsResource.query,
    }
}

export async function listApps( args: ListAppsArgs )
: Promise<typeof ListAppsResource.response> {
	try {
		const { limit, offset, page } = calculatePagination( {
			limit: args.payload.query?.limit,
			offset: args.payload.query?.offset
		} );

		const [apps, total] = await Promise.all( [
			App.model.find( {
				business: args.payload.query.businessId
			} )
				.sort( { createdAt: -1 } )
				.skip( offset )
				.limit( limit )
				.lean(),
			App.model.countDocuments()
		] );

		return notifyClientOfSuccess( {
			data: {
				apps,
				meta: {
					total,
					page,
					limit
				}
			}
		} );
	} catch ( error ) {
		throwScalexError( error );
	}
}