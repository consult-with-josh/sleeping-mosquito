import { z } from "zod";
import { zAsset } from "../../entities";
import { ActiveOrInactive, declareResource, HttpMethods, ScxEndpointSchema } from "../../../generic";
import { AssetsBasePath, AssetTags, TransactionsBasePath } from "../transactions.config";

const zCreateAsset = {
	body: zAsset.extend( {
		status: z.nativeEnum( ActiveOrInactive ).optional(),
	} ),
	response: zAsset,
	query: z.never()
};

export const CreateAssetResourceSchema: ScxEndpointSchema<
    z.infer<typeof zCreateAsset.body>,
    z.infer<typeof zCreateAsset.response>,
    z.infer<typeof zCreateAsset.query>
> = zCreateAsset;

export const CreateAssetResource = declareResource<
    z.infer<typeof zCreateAsset.body>,
    z.infer<typeof zCreateAsset.response>,
    z.infer<typeof zCreateAsset.query>
>( {
	schema: CreateAssetResourceSchema,
	method: HttpMethods.Post,
	path: '/',
	fullPath: `${TransactionsBasePath}${AssetsBasePath}`,
	tags: AssetTags,
	name: 'Create Asset',
	resourceName: 'CreateAssetResource',
	desc: 'Create a new asset'
} ); 