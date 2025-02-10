import PusherClient from "pusher-js";
import Pusher = require( "pusher" );

export const socketChannels = {
	notifications: {
		name: 'scx_notifications',
		events: {
			mailUser: 'mail-user',
			sendOtp: 'send-otp',
			sendSlackNotification: 'send-slack-notification'
		}
	},
};

export type SocketConfig = {
	appId: string;
	key: string;
	secret: string;
	cluster: string;
	encryptionMasterKeyBase64?: string;
};

export const createPublisher = ( params: SocketConfig ) => {
	return new Pusher( {
		appId: params.appId,
		key: params.key,
		secret: params.secret,
		cluster: params.cluster,
		useTLS: true,
		encryptionMasterKeyBase64: params.encryptionMasterKeyBase64,
	} );
};

export const listenForEventsOn = ( params: { key: string; cluster: string; channel: string } ) => {
	const pusherClient = new PusherClient( params.key, {
		cluster: params.cluster,
	} );
	return pusherClient.subscribe( params.channel );
};

export const publishMessage = <T>( params: SocketConfig, data: {
    channel: string;
    event: string;
    payload: T
} ) => {
	const publisher = createPublisher( params );
	return publisher.trigger( data.channel, data.event, data.payload );
};
