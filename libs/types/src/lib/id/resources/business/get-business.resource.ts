import { z } from "zod";
import { declareResource, HttpMethods, zQueryId } from "../../../generic";
import { BusinessesBasePath, BusinessTags } from "../id.config";
import { zBusiness } from "../../entities";

const zGetBusiness = {
	body: z.never(),
	response: zBusiness,
	query: zQueryId
};

export const GetBusinessResource = declareResource<
    z.infer<typeof zGetBusiness.body>,
    z.infer<typeof zGetBusiness.response>,
    z.infer<typeof zGetBusiness.query>
>( {
	schema: zGetBusiness,
	method: HttpMethods.Get,
	path: '/single',
	fullPath: `${BusinessesBasePath}/single`,
	tags: BusinessTags,
	name: 'Get Business',
	resourceName: 'GetBusinessResource',
	desc: 'Get a business by ID'
} ); 