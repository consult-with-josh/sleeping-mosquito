import { z } from "zod";
import { zApp, zRampConfig } from "../../../entities";
import { declareResource, HttpMethods, ScxEndpointSchema } from "../../../../generic";
import { AppTags, AppsBasePath } from "../..";

const zCreateAppPayload = zApp.pick( {
	business: true,
	name: true,
	description: true,
	logo: true,
	config: true
} ).extend( {
	business: z.string(),
	config: zRampConfig.partial().optional()
} );

const zCreateApp = {
	body: zCreateAppPayload,
	response: z.object( {
		app: zApp,
		apiKeys: z.object( {
			secretKey: z.string(),
			publishableKey: z.string()
		} )
	} ),
	query: z.never()
};

export const CreateAppResourceSchema: ScxEndpointSchema<
    z.infer<typeof zCreateApp.body>,
    z.infer<typeof zCreateApp.response>,
    z.infer<typeof zCreateApp.query>
> = zCreateApp;

export const CreateAppResource = declareResource<
    z.infer<typeof zCreateApp.body>,
    z.infer<typeof zCreateApp.response>,
    z.infer<typeof zCreateApp.query>
>( {
	schema: CreateAppResourceSchema,
	method: HttpMethods.Post,
	path: '/',
	fullPath: AppsBasePath,
	tags: AppTags,
	name: 'Create App',
	resourceName: 'CreateAppResource',
	desc: 'Create a new app'
} );
