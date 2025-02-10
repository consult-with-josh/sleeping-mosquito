import { zApp } from "../../../entities";
import { declareResource, HttpMethods, zQueryId } from "../../../../generic";
import { z } from "zod";
import { AppsBasePath, AppTags } from "../../id.config";

const zUpdateAppPayload = zApp.pick( {
	name: true,
	description: true,
	logo: true,
	config: true
} ).partial();

const zUpdateApp = {
	body: zUpdateAppPayload,
	response: zApp,
	query: zQueryId
};

export const UpdateAppResource = declareResource<
    z.infer<typeof zUpdateApp.body>,
    z.infer<typeof zUpdateApp.response>,
    z.infer<typeof zUpdateApp.query>
>( {
	schema: zUpdateApp,
	method: HttpMethods.Put,
	path: '/',
	fullPath: AppsBasePath,
	tags: AppTags,
	name: 'Update App',
	resourceName: 'UpdateAppResource',
	desc: 'Update an app'
} ); 