import { z } from "zod";
import { zNetwork } from "../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema, zQueryId } from "../../../generic";
import { NetworksBasePath, NetworkTags, TransactionsBasePath } from "../transactions.config";

const zGetNetwork = {
	body: z.never(),
	response: zNetwork,
	query: zQueryId
};

export const GetNetworkResourceSchema: ScxEndpointSchema<
    z.infer<typeof zGetNetwork.body>,
    z.infer<typeof zGetNetwork.response>,
    z.infer<typeof zGetNetwork.query>
> = zGetNetwork;

export const GetNetworkResource = declareResource<
    z.infer<typeof zGetNetwork.body>,
    z.infer<typeof zGetNetwork.response>,
    z.infer<typeof zGetNetwork.query>
>( {
	schema: GetNetworkResourceSchema,
	method: HttpMethods.Get,
	path: '/single',
	fullPath: `${TransactionsBasePath}${NetworksBasePath}/single`,
	tags: NetworkTags,
	name: 'Get Network',
	resourceName: 'GetNetworkResource',
	desc: 'Retrieve a single network by ID'
} ); 