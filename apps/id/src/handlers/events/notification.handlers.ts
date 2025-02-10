import { listenForEventsOn, logToSlack, MessagingChannel, OutgoingEmailPayload, OutogingOtpArgs, sendOtp, shootEmailViaDependency, socketChannels } from "@scalex-api/api-resources";
import { configs, secrets } from "../../environment";

export const bootstrapNotificationsHandler = () => {
	const channel = listenForEventsOn( {
		key: configs.pusher.key,
		cluster: configs.pusher.cluster,
		channel: socketChannels.notifications.name
	} );

	channel.bind( socketChannels.notifications.events.mailUser, ( payload: OutgoingEmailPayload ) => {
		return shootEmailViaDependency( {
			recipient: payload.to,
			templateData: payload.data,
			templateId: payload.template,
			channel: MessagingChannel.email,
			apiKey: secrets.elasticEmail,
			subject: payload.subject
		} );
	} );

	channel.bind( socketChannels.notifications.events.sendOtp, ( payload: OutogingOtpArgs ) => {
		return sendOtp( {
			payload,
			cacheConfig: configs.redis,
			socketConfig: configs.pusher
		} );
	} );

	channel.bind( socketChannels.notifications.events.sendSlackNotification, async ( message: string ) => {
		await logToSlack( message, {
			authToken: secrets.slack,
			channel: configs.slackChannel
		} );
	} );
};