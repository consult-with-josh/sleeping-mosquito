import { z } from "zod";
import { RampTxType, zDeal, zStyle } from "../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema } from "../../../generic";
import { DealsBasePath, DealTags } from "../ramp.config";

export const zCreateDealAsset = z.object( {
	id: z.string(),
	networks: z.array( z.string() ).optional(),
	isDefault: z.boolean().optional(),
} );

export const zCreateDealPayload = z.object( {
	app: z.string(),
	name: z.string(),
	type: z.nativeEnum( RampTxType ),
	style: zStyle,
	isDefault: z.boolean().optional(),
	assets: z.object( {
		buy: z.array( zCreateDealAsset ).min( 1 ),
		payWith: z.array( zCreateDealAsset ).min( 1 ),
	} )
} );

export type ICreateDealPayload = z.infer<typeof zCreateDealPayload>;

const zCreateDeal = {
	body: zCreateDealPayload,
	response: zDeal,
	query: z.never()
};

export const CreateDealResourceSchema: ScxEndpointSchema<
    z.infer<typeof zCreateDeal.body>,
    z.infer<typeof zCreateDeal.response>,
    z.infer<typeof zCreateDeal.query>
> = zCreateDeal;

export const CreateDealResource = declareResource<
    z.infer<typeof zCreateDeal.body>,
    z.infer<typeof zCreateDeal.response>,
    z.infer<typeof zCreateDeal.query>
>( {
	schema: CreateDealResourceSchema,
	method: HttpMethods.Post,
	path: '/',
	fullPath: DealsBasePath,
	tags: DealTags,
	name: 'Create Deal',
	resourceName: 'CreateDealResource',
	desc: 'Create a new deal'
} );
