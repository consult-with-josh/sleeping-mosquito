import { z } from "zod";
import { zNetwork } from "../../entities";
import { ActiveOrInactive, declareResource, HttpMethods, ScxEndpointSchema, zQueryId } from "../../../generic";
import { NetworksBasePath, NetworkTags, TransactionsBasePath } from "../transactions.config";

const zUpdateNetwork = {
	body: zNetwork.partial().extend( {
		status: z.nativeEnum( ActiveOrInactive ).optional(),
	} ),
	response: zNetwork,
	query: zQueryId
};

export const UpdateNetworkResourceSchema: ScxEndpointSchema<
    z.infer<typeof zUpdateNetwork.body>,
    z.infer<typeof zUpdateNetwork.response>,
    z.infer<typeof zUpdateNetwork.query>
> = zUpdateNetwork;

export const UpdateNetworkResource = declareResource<
    z.infer<typeof zUpdateNetwork.body>,
    z.infer<typeof zUpdateNetwork.response>,
    z.infer<typeof zUpdateNetwork.query>
>( {
	schema: UpdateNetworkResourceSchema,
	method: HttpMethods.Put,
	path: '/',
	fullPath: `${TransactionsBasePath}${NetworksBasePath}/`,
	tags: NetworkTags,
	name: 'Update Network',
	resourceName: 'UpdateNetworkResource',
	desc: 'Update an existing network'
} ); 