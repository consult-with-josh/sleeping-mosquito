import { z } from "zod";
import { zAsset, zAssetNetworkConfig } from "../../entities";
import { ActiveOrInactive, declareResource, HttpMethods, ScxEndpointSchema, zQueryId } from "../../../generic";
import { AssetsBasePath, AssetTags, TransactionsBasePath } from "../transactions.config";

const zUpdateAsset = {
	body: zAsset.partial().extend( {
		status: z.nativeEnum( ActiveOrInactive ).optional(),
		networks: z.array(
			zAssetNetworkConfig.extend( {
				id: z.string()
			} )
		).optional(),
	} ),
	response: zAsset,
	query: zQueryId
};

export const UpdateAssetResourceSchema: ScxEndpointSchema<
    z.infer<typeof zUpdateAsset.body>,
    z.infer<typeof zUpdateAsset.response>,
    z.infer<typeof zUpdateAsset.query>
> = zUpdateAsset;

export const UpdateAssetResource = declareResource<
    z.infer<typeof zUpdateAsset.body>,
    z.infer<typeof zUpdateAsset.response>,
    z.infer<typeof zUpdateAsset.query>
>( {
	schema: UpdateAssetResourceSchema,
	method: HttpMethods.Put,
	path: '/',
	fullPath: `${TransactionsBasePath}${AssetsBasePath}/`,
	tags: AssetTags,
	name: 'Update Asset',
	resourceName: 'UpdateAssetResource',
	desc: 'Update an existing asset'
} ); 