import { SocketConfig } from "../pusher.function";
import { createAndCacheOtp, OutogingOtpArgs, sendOtpViaChosenChannel } from "./otp.helpers";
import { RedisClientOptions } from "redis";

export type SendOtpToUserArgs = {
	payload: OutogingOtpArgs;
	cacheConfig: RedisClientOptions;
	socketConfig: SocketConfig
}

export async function sendOtp( args: SendOtpToUserArgs ) {
	try {
		const otp = await createAndCacheOtp( args.payload, args.cacheConfig );
		await sendOtpViaChosenChannel( args.payload.recipient, otp, args.socketConfig );
	} catch ( e ) {
		console.log( e );
	}
}