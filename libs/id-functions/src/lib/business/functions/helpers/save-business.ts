import { CreateBusinessResource, IBusiness, UpdateBusinessResource } from "@scalex-africa/types";
import { Business } from "@scalex-api/db";

export async function saveBusinessToDb( payload: typeof CreateBusinessResource.body )
: Promise<IBusiness> {
	const business = new Business.model( {
		name: payload.name,
		email: payload.email,
		tagline: payload.tagline,
		address: payload.address
	} );

	await business.save();
	return business.toObject();
}

export async function updateBusinessInDb( id: string, payload: typeof UpdateBusinessResource.body ) {
	const business = await Business.model.findByIdAndUpdate( id, payload, { new: true } );
	return business?.toObject();
}