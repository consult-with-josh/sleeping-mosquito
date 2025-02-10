import { z } from "zod";
import { zAsset } from "../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema, zQueryId } from "../../../generic";
import { AssetsBasePath, AssetTags, TransactionsBasePath } from "../transactions.config";

const zGetAsset = {
	body: z.never(),
	response: zAsset,
	query: zQueryId
};

export const GetAssetResourceSchema: ScxEndpointSchema<
    z.infer<typeof zGetAsset.body>,
    z.infer<typeof zGetAsset.response>,
    z.infer<typeof zGetAsset.query>
> = zGetAsset;

export const GetAssetResource = declareResource<
    z.infer<typeof zGetAsset.body>,
    z.infer<typeof zGetAsset.response>,
    z.infer<typeof zGetAsset.query>
>( {
	schema: GetAssetResourceSchema,
	method: HttpMethods.Get,
	path: '/single',
	fullPath: `${TransactionsBasePath}${AssetsBasePath}/single`,
	tags: AssetTags,
	name: 'Get Asset',
	resourceName: 'GetAssetResource',
	desc: 'Retrieve a single asset by ID'
} ); 