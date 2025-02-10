import { OutgoingEmailPayload } from "../inverters";
import { publishMessage, socketChannels, SocketConfig } from "./pusher.function";

export async function sendEmail( payload: OutgoingEmailPayload, socketConfig: SocketConfig ) {
	publishMessage( socketConfig, {
		channel: socketChannels.notifications.name,
		event: socketChannels.notifications.events.mailUser,
		payload
	} );
}