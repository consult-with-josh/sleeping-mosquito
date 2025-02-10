import { z } from "zod";
import { zDeal, zStyle } from "../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema, zQueryId } from "../../../generic";
import { DealsBasePath, DealTags } from "../ramp.config";
import { zCreateDealAsset, zCreateDealPayload } from "./create-deal.resource";

const zUpdateDealPayload = zCreateDealPayload.partial().extend( {
	style: zStyle.partial().optional(),
	assets: z.object( {
		buy: z.array( zCreateDealAsset ).optional(),
		payWith: z.array( zCreateDealAsset ).optional(),
	} )
} );

export type IUpdateDealPayload = z.infer<typeof zUpdateDealPayload>;

const zUpdateDeal = {
	body: zUpdateDealPayload,
	response: zDeal,
	query: zQueryId
};

export const UpdateDealResourceSchema: ScxEndpointSchema<
    z.infer<typeof zUpdateDeal.body>,
    z.infer<typeof zUpdateDeal.response>,
    z.infer<typeof zUpdateDeal.query>
> = zUpdateDeal;

export const UpdateDealResource = declareResource<
    z.infer<typeof zUpdateDeal.body>,
    z.infer<typeof zUpdateDeal.response>,
    z.infer<typeof zUpdateDeal.query>
>( {
	schema: UpdateDealResourceSchema,
	method: HttpMethods.Put,
	path: '/',
	fullPath: DealsBasePath,
	tags: DealTags,
	name: 'Update Deal',
	resourceName: 'UpdateDealResource',
	desc: 'Update an existing deal'
} ); 