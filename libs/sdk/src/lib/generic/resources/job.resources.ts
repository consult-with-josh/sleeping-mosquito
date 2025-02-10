import { HasQueryIdDto } from "../dtos";
import { IJob } from "../entities";
import { HttpMethods, ScxEndpoint } from "../utils";
import { JobBasePath } from "./paths.config";

export interface FetchJobRes {
  job: IJob;
}

export const FetchJobResource = new ScxEndpoint<HasQueryIdDto, FetchJobRes>( {
	method: HttpMethods.Get,
	path: '/',
	fullPath: `${JobBasePath}/`,
} );