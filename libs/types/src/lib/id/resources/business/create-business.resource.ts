import { z } from "zod";
import { declareResource, HttpMethods, ScxEndpointSchema } from "../../../generic";
import { BusinessesBasePath, BusinessTags } from "../id.config";
import { zBusiness } from "../../entities";

const zCreateBusinessPayload = zBusiness.pick( {
	name: true,
	email: true,
	tagline: true,
	address: true,
	status: true
} );

const zCreateBusiness = {
	body: zCreateBusinessPayload,
	response: zBusiness,
	query: z.never()
};

export const CreateBusinessResourceSchema: ScxEndpointSchema<
    z.infer<typeof zCreateBusiness.body>,
    z.infer<typeof zCreateBusiness.response>,
    z.infer<typeof zCreateBusiness.query>
> = zCreateBusiness;

export const CreateBusinessResource = declareResource<
    z.infer<typeof zCreateBusiness.body>,
    z.infer<typeof zCreateBusiness.response>,
    z.infer<typeof zCreateBusiness.query>
>( {
	schema: CreateBusinessResourceSchema,
	method: HttpMethods.Post,
	path: '/',
	fullPath: BusinessesBasePath,
	tags: BusinessTags,
	name: 'Create Business',
	resourceName: 'CreateBusinessResource',
	desc: 'Create a new business'
} );


