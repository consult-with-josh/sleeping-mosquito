import { HttpStatusCode } from 'axios';
import { captureException } from '@sentry/node';
import { ScxError } from '@scalex-api/sdk';

const GenericErrors: {
	unidentifiedError: ( e: unknown ) => ScxError
} = {
	unidentifiedError: ( e: unknown ) => {
		captureException( e );
		return {
			statusCode: HttpStatusCode.InternalServerError,
			message: `We had an internal error. It's not you it's us.`,
			recommendedActions: [
				`Report this issue to our support team. It's probably a bug`
			]
		};
	}
};

export function throwScalexError( e: unknown ) {
	const scalexErr = e as ScxError;
	if ( scalexErr.statusCode && scalexErr.message ) {
		throw e;
	}
	throw GenericErrors.unidentifiedError( e );
}
