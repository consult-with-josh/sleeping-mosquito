import { CookieStructure, ScxError, ScxSuccessRes } from '@scalex-api/sdk';
import { Response } from 'express';

type UnknownCookieStructure = { cookies: Array<CookieStructure> }

export async function scxExec<
    FunctionReturnType, FunctionArgs = unknown
>(
	fn: ( args?: FunctionArgs ) => 
	Promise<ScxSuccessRes<FunctionReturnType>> | ScxSuccessRes<FunctionReturnType>,
	res: Response,
	args?: FunctionArgs 
) {
	try {
		const processedRequest = args ? await fn( args ) : await fn();
		if ( ( processedRequest?.data as UnknownCookieStructure )?.cookies ) {
			( processedRequest?.data as UnknownCookieStructure )?.cookies.forEach( cookie => {
				res.cookie( cookie.key, cookie.value, {
					path: '/',
					sameSite: 'strict',
					secure: true,
				} );
			} );
			delete ( processedRequest?.data as UnknownCookieStructure )?.cookies;
		}
		res.status( processedRequest.statusCode as number ).json( processedRequest );
	} catch ( e ) {
		const err = e as ScxError;
		res.status( err.statusCode ).json( err );
	}
}