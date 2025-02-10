import { createServer } from "http";
import { Server } from 'socket.io';

export function createSocketServer( app: Express.Application ){
	const httpServer = createServer( app );
	const io = new Server( httpServer, {
		cors: {
			origin: '*',
			methods: ['GET', 'POST']
		},
		pingTimeout: 10000,
		pingInterval: 25000,
	} );

	return {
		httpServer,
		io
	};
}
