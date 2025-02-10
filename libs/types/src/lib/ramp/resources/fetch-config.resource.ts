
import { z } from "zod";
import { declareResource, HttpMethods, ScxEndpointSchema } from "../../generic";
import { ConfigBasePath, RampBasePath } from "./ramp.config";

export const RampConfigTags = [ 'Config' ];

const zFetchConfig = {
	body: z.object( {
		ref: z.string().optional(),
	} ),
	response: z.object( {} ),
	query: z.never(),
	headers: z.object( {
		appId: z.string(),
		publishableKey: z.string(),
		secretKey: z.string(),
	} ),
};

export const FetchConfigResourceSchema: ScxEndpointSchema<
  z.infer<typeof zFetchConfig.body>,
  z.infer<typeof zFetchConfig.response>,
  z.infer<typeof zFetchConfig.query>,
  z.infer<typeof zFetchConfig.headers>
> = zFetchConfig;

export const FetchConfigResource = declareResource<
  z.infer<typeof zFetchConfig.body>,
  z.infer<typeof zFetchConfig.response>,
  z.infer<typeof zFetchConfig.query>,
  z.infer<typeof zFetchConfig.headers>
>( {
	schema: FetchConfigResourceSchema,
	method: HttpMethods.Get,
	path: '/',
	fullPath: `${RampBasePath}${ConfigBasePath}`,
	tags: RampConfigTags,
	name: `Fetch Config`,
	resourceName: 'FetchConfigResource',
	desc: 'Fetch the initial configuration for the ramp widget',
} );
