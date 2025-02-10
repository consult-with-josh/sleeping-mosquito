import { z } from "zod";
import { declareResource, HttpMethods, zQueryId } from "../../../generic";
import { zBusiness } from "../../entities";
import { BusinessesBasePath, BusinessTags } from "../id.config";

const zUpdateBusinessPayload = zBusiness.pick( {
	name: true,
	email: true,
	tagline: true,
	address: true,
	status: true
} ).partial();

const zUpdateBusiness = {
	body: zUpdateBusinessPayload,
	response: zBusiness,
	query: zQueryId
};

export const UpdateBusinessResource = declareResource<
    z.infer<typeof zUpdateBusiness.body>,
    z.infer<typeof zUpdateBusiness.response>,
    z.infer<typeof zUpdateBusiness.query>
>( {
	schema: zUpdateBusiness,
	method: HttpMethods.Patch,
	path: '/',
	fullPath: BusinessesBasePath,
	tags: BusinessTags,
	name: 'Update Business',
	resourceName: 'UpdateBusinessResource',
	desc: 'Update a business'
} );