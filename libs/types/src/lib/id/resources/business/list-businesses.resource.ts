import { z } from "zod";
import { declareResource, HttpMethods, ScxEndpointSchema, zPagination, zPaginationMeta } from "../../../generic";
import { BusinessesBasePath, BusinessTags } from "../id.config";
import { zBusiness } from "../../entities";

const zListBusinesses = {
	body: z.never(),
	response: z.object( {
		businesses: z.array( zBusiness ),
		meta: zPaginationMeta
	} ),
	query: zPagination
};

export const ListBusinessesResourceSchema: ScxEndpointSchema<
    z.infer<typeof zListBusinesses.body>,
    z.infer<typeof zListBusinesses.response>,
    z.infer<typeof zListBusinesses.query>
> = zListBusinesses;

export const ListBusinessesResource = declareResource<
    z.infer<typeof zListBusinesses.body>,
    z.infer<typeof zListBusinesses.response>,
    z.infer<typeof zListBusinesses.query>
>( {
	schema: ListBusinessesResourceSchema,
	method: HttpMethods.Get,
	path: '/',
	fullPath: BusinessesBasePath,
	tags: BusinessTags,
	name: 'List Businesses',
	resourceName: 'ListBusinessesResource',
	desc: 'List all businesses'
} ); 