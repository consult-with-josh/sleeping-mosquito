import { Server, Socket } from 'socket.io';
import { ScxErrors } from '@scalex-api/sdk';
import { throwScalexError } from '../exception-factory';
import { Org } from '../../constants';

export function validateSocketCredentials( io: Server ){
	io.use( ( socket: Socket, next ) => {
		try {
			const apiKey = socket.handshake.auth?.apiKey;
			if ( apiKey === Org.socket.apiKey ) {
				next();
			} else {
				throwScalexError( ScxErrors.invalidCredentials() );
			}
		} catch ( error ) {
			next( error );
		}
	} );
}
