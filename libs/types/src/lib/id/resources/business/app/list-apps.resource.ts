import { z } from "zod";
import { declareResource, HttpMethods, zPagination, zPaginationMeta } from "../../../../generic";
import { AppsBasePath, AppTags } from "../../id.config";
import { zApp } from "../../../entities";

const zListApps = {
	body: z.never(),
	response: z.object( {
		apps: z.array( zApp ),
		meta: zPaginationMeta
	} ),
	query: zPagination.extend( {
		businessId: z.string()
	} )
};

export const ListAppsResource = declareResource<
    z.infer<typeof zListApps.body>,
    z.infer<typeof zListApps.response>,
    z.infer<typeof zListApps.query>
>( {
	schema: zListApps,
	method: HttpMethods.Get,
	path: '/',
	fullPath: AppsBasePath,
	tags: AppTags,
	name: 'List Apps',
	resourceName: 'ListAppsResource',
	desc: 'List all apps for a business'
} ); 