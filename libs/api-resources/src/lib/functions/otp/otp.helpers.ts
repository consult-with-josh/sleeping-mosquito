import { generator } from 'random-number';
import { RedisClientOptions } from 'redis';
import { compareSync, hashSync } from 'bcrypt';
import { EmailTemplates } from '../../inverters';
import { sendEmail } from '../send-email.function';
import { SocketConfig } from '../pusher.function';
import { OtpContext } from '@scalex-api/sdk';
import { deleteFromCache, readFromCache, writeToCache } from '../cache-crud.function';

const OtpExpiry = 10 * 60;

export type OutogingOtpArgs = { recipient: string; context: OtpContext }

export function createOtp( length = 6 ) {
	const generate = generator( {
		min: Math.pow( 10, length - 1 ),
		max: Math.pow( 10, length ) - 1,
		integer: true,
	} );

	return generate();
}

export async function createAndCacheOtp(
	payload: OutogingOtpArgs,
	cacheConfig: RedisClientOptions
): Promise<string> {
	const otp = createOtp().toString();
	await writeToCache( `${payload.recipient}:${payload.context}`, OtpExpiry, hashSync( otp, 10 ), cacheConfig );
	return otp;
}

export async function sendOtpViaChosenChannel(
	recipient: string,
	otp: string,
	socketConfig: SocketConfig
) {
	try {
		await sendEmail( {
			to: recipient,
			template: EmailTemplates.Otp,
			data: {
				otp
			},
		}, socketConfig );
	} catch ( e ) {
		console.log( e );
	}
}

export async function fetchAndVerifyOtpFromCache(
	recipient: string,
	context: OtpContext,
	cacheConfig: RedisClientOptions,
	otp: string
): Promise<boolean> {
	try {
		const key = `${recipient}:${context}`;

		const otpFromCache = await readFromCache<string>( key, cacheConfig );
		const isValid = compareSync( otp, otpFromCache );
		if ( isValid ) await deleteFromCache( key, cacheConfig );
		return isValid;
	} catch ( e ) {
		console.log( e );
		return undefined;
	}
}
