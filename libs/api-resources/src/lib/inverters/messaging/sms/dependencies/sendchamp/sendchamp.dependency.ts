import { MessagingDependency, OutgoingSingleMessagePayload } from "../types";
import { callSendchamp, sendchampEndpoints } from "./sendchamp.factory";
import { SendchampSendOtpPayload, SendchampSendOtpResponse, SendchampVerifyOtpPayload, SendchampVerifyOtpResponse } from "./sendchamp.types";

export class SendchampDependency implements MessagingDependency {
	constructor( private apiKey: string ) {}

	async sendSingleMessage( payload: OutgoingSingleMessagePayload ) {
		console.log( payload );
	}

	async sendOTP( payload: OutgoingSingleMessagePayload ): Promise<string> {
		const otpTransaction = await callSendchamp<SendchampSendOtpPayload, SendchampSendOtpResponse>( {
			endpoint: sendchampEndpoints.sendOtp,
			body: {
				channel: payload.channel,
				sender: `SAlert`,
				token_length: 4,
				token_type: 'numeric',
				expiration_time: 10,
				customer_mobile_number: payload.recipient,
				meta_data: payload.meta,
			}
		}, this.apiKey );
		return otpTransaction.data.reference;
	};

	async verifyOTP( payload, reference: string ): Promise<boolean> {
		try {
			await callSendchamp<SendchampVerifyOtpPayload, SendchampVerifyOtpResponse>( {
				endpoint: sendchampEndpoints.verifyOtp,
				body: {
					verification_code: payload.token,
					verification_reference: reference
				}
			}, this.apiKey );
			return true;
		} catch ( e ) {
			return false;
		}
	}
}