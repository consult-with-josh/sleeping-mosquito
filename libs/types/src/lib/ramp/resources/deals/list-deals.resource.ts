import { z } from "zod";
import { zDeal } from "../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema, zQueryId } from "../../../generic";
import { DealsBasePath, DealTags } from "../ramp.config";

const zListDealsResponse = z.array( zDeal );

const zListDeals = {
	body: z.never(),
	response: zListDealsResponse,
	query: zQueryId
};

export const ListDealsResourceSchema: ScxEndpointSchema<
    z.infer<typeof zListDeals.body>,
    z.infer<typeof zListDeals.response>,
    z.infer<typeof zListDeals.query>
> = zListDeals;

export const ListDealsResource = declareResource<
    z.infer<typeof zListDeals.body>,
    z.infer<typeof zListDeals.response>,
    z.infer<typeof zListDeals.query>
>( {
	schema: ListDealsResourceSchema,
	method: HttpMethods.Get,
	path: '/',
	fullPath: DealsBasePath,
	tags: DealTags,
	name: 'List Deals',
	resourceName: 'ListDealsResource',
	desc: 'List all deals for an app'
} ); 