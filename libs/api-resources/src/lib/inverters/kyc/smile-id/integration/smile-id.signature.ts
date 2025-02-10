import { createHmac } from 'crypto';
import { SmileIdAuth } from './smile-id.repository';

export function signSmileRequest( smileIdAuth: SmileIdAuth ) {
	const timestamp = new Date().toISOString();
	const hmac = createHmac( 'sha256', smileIdAuth.apiKey );

	hmac.update( timestamp, 'utf8' );
	hmac.update( smileIdAuth.partnerId, 'utf8' );
	hmac.update( 'sid_request', 'utf8' );

	return {
		signature: hmac.digest().toString( 'base64' ),
		timestamp
	};
}
