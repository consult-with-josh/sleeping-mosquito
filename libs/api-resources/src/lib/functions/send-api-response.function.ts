import { AxiosError, HttpStatusCode } from "axios";
import { GenericErrors } from "../constants";
import { ApiRes, ScxError, ScxSuccessRes } from "@scalex-api/sdk";

export function notifyClientOfSuccess<T = unknown>(
	payload?: Partial<ScxSuccessRes<T>>
): ScxSuccessRes<T> {
	if ( !payload ) payload = {};
	payload.statusCode = payload.statusCode ?? HttpStatusCode.Ok,
	payload.message = payload.message ?? 'Your request was successful';
	return {
		statusCode: payload.statusCode,
		message: payload.message,
		data: payload.data,
	};
}

export function notifyClientOfFailure<T>( {
	data = {} as never,
	error,
}: {
	data?: T;
	error: ScxError | AxiosError;
} ): ApiRes<T> {
	if ( error instanceof AxiosError ) {
		const scxErr = error.response?.data as ScxError;
		return {
			statusCode: Number( error.response?.status ) || scxErr?.statusCode || HttpStatusCode.InternalServerError,
			data,
			message: scxErr?.message ?? GenericErrors.unidentifiedError( null ).message,
			error: scxErr,
		};
	}
	return {
		statusCode: error.statusCode || HttpStatusCode.InternalServerError ,
		data,
		message: error.message ?? GenericErrors.unidentifiedError( null ).message,
		error,
	};
}
