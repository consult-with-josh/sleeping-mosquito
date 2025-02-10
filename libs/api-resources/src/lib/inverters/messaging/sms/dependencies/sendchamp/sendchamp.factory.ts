import { HttpMethods, ScxEndpoint } from "@scalex-api/sdk";
import { makeHttpRequest, notifyClientOfFailure } from "../../../../../functions";

export const sendchampEndpoints = {
	sendOtp: {
		method: HttpMethods.Post,
		path: '/verification/create',
		fullPath: '/verification/create'
	},
	verifyOtp: {
		method: HttpMethods.Post,
		path: '/verification/confirm',
		fullPath: '/verification/confirm'
	}
};

export async function callSendchamp<Input, Output = void>( requestParams: {
    endpoint: ScxEndpoint,
    body?: Input,
    query?: unknown,
}, apiKey: string ): Promise<Output> {
	try {
		const response = await makeHttpRequest( {
			headers: { authorization: `Bearer ${apiKey}` },
			method: requestParams.endpoint.method,
			body: requestParams.body,
			query: requestParams.query,
			url: `https://api.sendchamp.com/api/v1` + requestParams.endpoint.path
		} );
		return response.data;
	} catch ( e ) {
		const formattedError = notifyClientOfFailure( {
			error: e,
		} );
		throw formattedError;
	}
}
