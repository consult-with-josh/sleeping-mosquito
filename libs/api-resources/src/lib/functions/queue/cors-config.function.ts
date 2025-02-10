export const corsConfig = ( origin: string, callback: ( ...args: unknown[] ) => void, environment: string ) => {
	const acceptedOrigins = [
		'http://localhost:3000'
	];
	if ( !['development', 'local'].includes( environment ) ) {
		for ( const a of acceptedOrigins )
			if ( origin.endsWith( a ) ) callback( null, true );
			else callback( new Error( 'Blocked by CORS' ) );
	} else {
		callback( null, true );
	}
};