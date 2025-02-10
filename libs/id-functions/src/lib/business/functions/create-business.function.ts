import { CreateBusinessResource, GenericErrors } from "@scalex-africa/types";
import { saveBusinessToDb, validateBusinessForCreation } from "./helpers";
import { notifyClientOfSuccess } from "@scalex-api/api-resources";

type CreateBusinessArgs = {
	payload: {
		body: typeof CreateBusinessResource.body,
	}
}

export async function createBusiness( args: CreateBusinessArgs )
: Promise<typeof CreateBusinessResource.response> {
	try {
		await validateBusinessForCreation( args.payload.body );
		return notifyClientOfSuccess( {
			data: await saveBusinessToDb( args.payload.body ),
		} );
	} catch ( error ) {
		throw GenericErrors.couldNotCreateResource( 'Business' );
	}
}
