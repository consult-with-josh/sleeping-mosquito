import { z } from "zod";
import { zNetwork } from "../../entities";
import { ActiveOrInactive, declareResource, HttpMethods, ScxEndpointSchema } from "../../../generic";
import { NetworksBasePath, NetworkTags, TransactionsBasePath } from "../transactions.config";

const zCreateNetwork = {
	body: zNetwork.extend( {
		status: z.nativeEnum( ActiveOrInactive ).optional(),
	} ),
	response: zNetwork,
	query: z.never()
};

export const CreateNetworkResourceSchema: ScxEndpointSchema<
	z.infer<typeof zCreateNetwork.body>,
	z.infer<typeof zCreateNetwork.response>,
	z.infer<typeof zCreateNetwork.query>
> = zCreateNetwork;

export const CreateNetworkResource = declareResource<
	z.infer<typeof zCreateNetwork.body>,
	z.infer<typeof zCreateNetwork.response>,
	z.infer<typeof zCreateNetwork.query>
>( {
	schema: CreateNetworkResourceSchema,
	method: HttpMethods.Post,
	path: '/',
	fullPath: `${TransactionsBasePath}${NetworksBasePath}`,
	tags: NetworkTags,
	name: `Create Network`,
	resourceName: 'CreateNetworkResource',
	desc: 'Create a new network'
} );
