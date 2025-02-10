import { HttpMethods, ScxEndpoint } from "../utils";
import { LegacyBasePath } from "./paths.config";

export const ImportLegacyUsersResource = new ScxEndpoint<unknown, unknown>( {
	method: HttpMethods.Post,
	path: '/import-users',
	fullPath: `${LegacyBasePath}/import-users`,
} );
