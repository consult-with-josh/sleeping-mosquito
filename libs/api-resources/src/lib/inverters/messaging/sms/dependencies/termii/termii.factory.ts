import { HttpMethods, ScxEndpoint } from "@scalex-api/sdk";
import { makeHttpRequest, notifyClientOfFailure } from "../../../../../functions";

export const termiiEndpoints = {
	sendOtp: {
		method: HttpMethods.Post,
		path: '/sms/otp/send',
		fullPath: '/sms/otp/send'
	},
	verifyOtp: {
		method: HttpMethods.Post,
		path: '/sms/otp/verify',
		fullPath: '/sms/otp/verify'
	}
};

export async function callTermii<Input, Output = void>( requestParams: {
    endpoint: ScxEndpoint,
    body?: Input,
    query?: unknown,
} ): Promise<Output> {
	try {
		console.log( requestParams.body );
		const response = await makeHttpRequest( {
			method: requestParams.endpoint.method,
			body: requestParams.body,
			query: requestParams.query,
			url: `https://api.ng.termii.com/api` + requestParams.endpoint.path
		} );
		return response.data;
	} catch ( e ) {
		const formattedError = notifyClientOfFailure( {
			error: e,
		} );
		throw formattedError;
	}
}