import { CookieStructure } from "./generic.response";
import { ScxSuccessRes } from "./success.response";

export type IEmptyResponse = ScxSuccessRes<{
    cookies?: Array<CookieStructure>
}>

export class EmptySuccessResponse implements ScxSuccessRes<unknown> {
	statusCode = 200;
	message = 'Success';
	data = {};
}