import { z } from "zod";
import { AppCredType, AvailableAppCredClaims } from "../../../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema } from "../../../../../generic";
import { AppsBasePath, AppTags } from "../../../id.config";

export const zCreateAppCredentialsConfig = {
	body: z.object( {
		app: z.string(),
		name: z.string(),
		type: z.nativeEnum( AppCredType ),
		claims: z.array( z.nativeEnum( AvailableAppCredClaims ) ),
		value: z.string().optional()
	} ),
	query: z.never(),
	response: z.object( {
		credential: z.object( {
			type: z.nativeEnum( AppCredType ),
			name: z.string(),
			value: z.string()
		} )
	} )
};

export const CreateAppCredentialsConfigResourceSchema: ScxEndpointSchema<
    z.infer<typeof zCreateAppCredentialsConfig.body>,
    z.infer<typeof zCreateAppCredentialsConfig.response>,
    z.infer<typeof zCreateAppCredentialsConfig.query>
> = zCreateAppCredentialsConfig;

export const CreateAppCredentialsConfigResource = declareResource<
    z.infer<typeof zCreateAppCredentialsConfig.body>,
    z.infer<typeof zCreateAppCredentialsConfig.response>,
    z.infer<typeof zCreateAppCredentialsConfig.query>
>( {
	schema: CreateAppCredentialsConfigResourceSchema,
	method: HttpMethods.Post,
	path: '/credentials',
	fullPath: `${AppsBasePath}/credentials`,
	tags: AppTags,
	name: 'Create App Credentials',
	resourceName: 'CreateAppCredentialsConfigResource',
	desc: 'Create app credentials'
} );