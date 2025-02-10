import { z } from "zod";
import { AppCredType, AvailableAppCredClaims } from "../../../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema } from "../../../../../generic";
import { AppsBasePath, AppTags } from "../../../id.config";

export const zListAppCredentialsConfig = {
	body: z.never(),
	query: z.never(),
	response: z.object( {
		type: z.array( z.nativeEnum( AppCredType ) ),
		claims: z.array( z.nativeEnum( AvailableAppCredClaims ) )
	} )
};

export const ListAppCredentialsConfigResourceSchema: ScxEndpointSchema<
    z.infer<typeof zListAppCredentialsConfig.body>,
    z.infer<typeof zListAppCredentialsConfig.response>,
    z.infer<typeof zListAppCredentialsConfig.query>
> = zListAppCredentialsConfig;

export const ListAppCredentialsConfigResource = declareResource<
    z.infer<typeof zListAppCredentialsConfig.body>,
    z.infer<typeof zListAppCredentialsConfig.response>,
    z.infer<typeof zListAppCredentialsConfig.query>
>( {
	schema: ListAppCredentialsConfigResourceSchema,
	method: HttpMethods.Get,
	path: '/credentials/config',
	fullPath: `${AppsBasePath}/credentials/config`,
	tags: AppTags,
	name: 'List App Credentials Config',
	resourceName: 'ListAppCredentialsConfigResource',
	desc: 'List app credentials config'
} );
