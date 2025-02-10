import { z } from "zod";
import { zAsset } from "../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema, zPagination, zPaginationMeta } from "../../../generic";
import { AssetsBasePath, AssetTags, TransactionsBasePath } from "../transactions.config";

const zListAssets = {
	body: z.never(),
	response: z.object( {
		data: z.array( zAsset ),
		meta: zPaginationMeta
	} ),
	query: zPagination.optional()
};

export const ListAssetsResourceSchema: ScxEndpointSchema<
    z.infer<typeof zListAssets.body>,
    z.infer<typeof zListAssets.response>,
    z.infer<typeof zListAssets.query>
> = zListAssets;

export const ListAssetsResource = declareResource<
    z.infer<typeof zListAssets.body>,
    z.infer<typeof zListAssets.response>,
    z.infer<typeof zListAssets.query>
>( {
	schema: ListAssetsResourceSchema,
	method: HttpMethods.Get,
	path: '/',
	fullPath: `${TransactionsBasePath}${AssetsBasePath}`,
	tags: AssetTags,
	name: 'List Assets',
	resourceName: 'ListAssetsResource',
	desc: 'Retrieve a list of assets'
} ); 