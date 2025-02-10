import { Server, Socket } from 'socket.io';

export const socketIOChannels = {
	notifications: {
		name: 'scx_socket_io_notification',
		events: {
			initRateUpdates: 'init-rate-updates',
			getRateUpdates: 'get-rate-updates',
		}
	},
};

export function socketIOEventHandler( io: Server, channel: string ){
	let connectedClients = 0;
	let interval: NodeJS.Timeout | null = null;

	io.on( 'connection', ( socket: Socket ) => {
		console.log( `Socket connected: ${socket.id}` );

		socket.join( channel );
		connectedClients++;

		if ( connectedClients === 1 && !interval ) {
			interval = setInterval( async () => {
				publishSocketIOMessage( io, {
					channel: socketIOChannels.notifications.name,
					event: socketIOChannels.notifications.events.initRateUpdates
				} );
			}, 5000 );
		}

		socket.on( 'disconnect', () => {
			console.log( `Socket disconnected: ${socket.id}` );
			if ( connectedClients === 0 && interval ) {
				clearInterval( interval );
				interval = null;
			}
		} );
	} );

	return {
		bind: ( event: string, handler: ( payload: unknown ) => void ) => {
			io.of( `/${channel}` ).on( event, handler );
		}
	};
}

export function publishSocketIOMessage<T>( io: Server, data: {
    channel: string;
    event: string;
    payload?: T
  }
){
	io.to( data.channel ).emit( data.event, data?.payload );
}
