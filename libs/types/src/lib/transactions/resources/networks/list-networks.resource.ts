import { z } from "zod";
import { zNetwork } from "../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema, zPagination, zPaginationMeta } from "../../../generic";
import { NetworksBasePath, NetworkTags, TransactionsBasePath } from "../transactions.config";

const zListNetworks = {
	body: z.never(),
	response: z.object( {
		data: z.array( zNetwork ),
		meta: zPaginationMeta
	} ),
	query: zPagination.optional()
};

export const ListNetworksResourceSchema: ScxEndpointSchema<
    z.infer<typeof zListNetworks.body>,
    z.infer<typeof zListNetworks.response>,
    z.infer<typeof zListNetworks.query>
> = zListNetworks;

export const ListNetworksResource = declareResource<
    z.infer<typeof zListNetworks.body>,
    z.infer<typeof zListNetworks.response>,
    z.infer<typeof zListNetworks.query>
>( {
	schema: ListNetworksResourceSchema,
	method: HttpMethods.Get,
	path: '/',
	fullPath: `${TransactionsBasePath}${NetworksBasePath}`,
	tags: NetworkTags,
	name: 'List Networks',
	resourceName: 'ListNetworksResource',
	desc: 'Retrieve a list of networks'
} ); 