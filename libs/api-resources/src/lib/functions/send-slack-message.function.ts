import { publishMessage, socketChannels, SocketConfig } from "./pusher.function";

export async function sendSlackMessage( message: string, socketConfig: SocketConfig ) {
	publishMessage( socketConfig, {
		channel: socketChannels.notifications.name,
		event: socketChannels.notifications.events.sendSlackNotification,
		payload: message
	} );
}