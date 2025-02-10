import { MessagingChannel, MessagingDependency, OutgoingSingleMessagePayload } from "../types";
import { callTermii, termiiEndpoints } from "./termii.factory";
import { TermiiMessageType, TermiiPinExpiry, TermiiPinPlaceholder, TermiiSendOtpPayload, TermiiSendOtpResponse, TermiiVerifyOtpPayload, TermiiVerifyOtpResponse, } from "./termii.types";

export class TermiiDependency implements MessagingDependency {
	constructor( private apiKey: string ) {}
	async sendSingleMessage( payload: OutgoingSingleMessagePayload ) {
		console.log( payload );
	}
	
	async sendOTP( payload: OutgoingSingleMessagePayload ): Promise<string> {
		const otpTransaction = await callTermii<TermiiSendOtpPayload, TermiiSendOtpResponse>( {
			endpoint: termiiEndpoints.sendOtp,
			body: {
				api_key: this.apiKey,
				message_type: TermiiMessageType.Numeric,
				from: `Scalex`,
				to: payload.recipient,
				channel: MessagingChannel.sms,
				pin_attempts: 3,
				pin_length: 4,
				pin_time_to_live: TermiiPinExpiry,
				message_text: `Your Scalex OTP is ${TermiiPinPlaceholder.Placeholder}. Expires in ${TermiiPinExpiry} minutes. Thank you`,
				pin_placeholder: TermiiPinPlaceholder.Placeholder,
				pin_type: TermiiMessageType.Numeric
			}
		} );
		console.log( otpTransaction );
		return otpTransaction.pinId;
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async verifyOTP( payload: any, reference: string ): Promise<boolean> {
		try {
			const chicken = await callTermii<TermiiVerifyOtpPayload, TermiiVerifyOtpResponse>( {
				endpoint: termiiEndpoints.verifyOtp,
				body: {
					api_key: this.apiKey,
					pin: payload.token,
					pin_id: reference
				}
			} );
			console.log( chicken );
			return true;
		} catch ( e ) {
			return false;
		}
	}
}