import { HttpStatusCode } from "axios";

export interface ScxError<T = unknown> {
	code?: string;
	statusCode: HttpStatusCode;
	message: string;
	recommendedActions?: Array<string>;
	description?: string;
	data?: T;
}
