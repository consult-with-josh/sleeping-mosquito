import { z } from "zod";
import { zAppCred } from "../../../../entities";
import { AppsBasePath, AppTags } from "../../../id.config";
import { declareResource, HttpMethods, ScxEndpointSchema, zQueryId } from "../../../../../generic";

export const zListAppCredentials = {
	body: z.never(),
	query: zQueryId,
	response: z.object( {
		credentials: z.array( zAppCred )
	} )
};

export const ListAppCredentialsResourceSchema: ScxEndpointSchema<
    z.infer<typeof zListAppCredentials.body>,
    z.infer<typeof zListAppCredentials.response>,
    z.infer<typeof zListAppCredentials.query>
> = zListAppCredentials;

export const ListAppCredentialsResource = declareResource<
    z.infer<typeof zListAppCredentials.body>,
    z.infer<typeof zListAppCredentials.response>,
    z.infer<typeof zListAppCredentials.query>
>( {
	schema: ListAppCredentialsResourceSchema,
	method: HttpMethods.Get,
	path: '/credentials',
	fullPath: `${AppsBasePath}/credentials`,
	tags: AppTags,
	name: 'List App Credentials',
	resourceName: 'ListAppCredentialsResource',
	desc: 'List app credentials'
} );