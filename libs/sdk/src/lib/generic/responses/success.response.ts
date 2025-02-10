import { HttpStatusCode } from "axios";

export interface ScxSuccessRes<T = unknown> {
	statusCode: HttpStatusCode;
	message: string;
	data: T;
}
