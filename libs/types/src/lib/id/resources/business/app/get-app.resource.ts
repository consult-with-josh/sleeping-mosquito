import { z } from "zod";
import { declareResource, HttpMethods, zQueryId } from "../../../../generic";
import { zApp } from "../../../entities";
import { AppsBasePath, AppTags } from "../../id.config";

const zGetApp = {
	body: z.never(),
	response: zApp,
	query: zQueryId
};

export const GetAppResource = declareResource<
    z.infer<typeof zGetApp.body>,
    z.infer<typeof zGetApp.response>,
    z.infer<typeof zGetApp.query>
>( {
	schema: zGetApp,
	method: HttpMethods.Get,
	path: '/single',
	fullPath: `${AppsBasePath}/single`,
	tags: AppTags,
	name: 'Get App',
	resourceName: 'GetAppResource',
	desc: 'Get an app by ID'
} ); 