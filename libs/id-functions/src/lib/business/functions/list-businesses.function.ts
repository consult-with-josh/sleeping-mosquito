import { ListBusinessesResource, calculatePagination } from "@scalex-africa/types";
import { notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { Business } from "@scalex-api/db";

type ListBusinessesArgs = {
    payload: {
        query: typeof ListBusinessesResource.query,
    }
}

export async function listBusinesses( args: ListBusinessesArgs )
: Promise<typeof ListBusinessesResource.response> {
	try {
		const { limit, offset, page } = calculatePagination( {
			limit: args.payload.query?.limit,
			offset: args.payload.query?.offset
		} );

		const [businesses, total] = await Promise.all( [
			Business.model.find()
				.sort( { createdAt: -1 } )
				.skip( offset )
				.limit( limit )
				.lean(),
			Business.model.countDocuments()
		] );

		return notifyClientOfSuccess( {
			data: {
				businesses,
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