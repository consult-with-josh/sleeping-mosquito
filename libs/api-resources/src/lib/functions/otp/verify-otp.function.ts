import { fetchAndVerifyOtpFromCache } from './otp.helpers';
import { RedisClientOptions } from 'redis';
import { HttpStatusCode } from 'axios';
import { OtpContext, ScxError } from '@scalex-api/sdk';
import { throwScalexError } from '../exception-factory';

export const VerifyOtpErrors: {
	invalidOrExpiredRequest: ScxError
} = {
	invalidOrExpiredRequest: {
		statusCode: HttpStatusCode.BadRequest,
		code: 'INVALID_OR_EXPIRED_OTP_VERIFICATION_REQUEST',
		message: `This transaction is either invalid or has expired`,
		recommendedActions: [
			`Request a new OTP`
		]
	}
};

export type VerifyOtpPayload = {
	recipient: string;
	context: OtpContext;
	otp: string;
};

export type VerifyOtpArgs = {
	payload: VerifyOtpPayload;
	cacheConfig: RedisClientOptions;
};

export async function verifyOtp(
	args: VerifyOtpArgs
): Promise<void> {
	try {
		const otpIsValid = await fetchAndVerifyOtpFromCache(
			args.payload.recipient,
			args.payload.context,
			args.cacheConfig,
			args.payload.otp
		);
	
		if ( !otpIsValid ) throw VerifyOtpErrors.invalidOrExpiredRequest;
	} catch ( e ) {
		throwScalexError( e );
	}
}
