import { constructScxExpressApp } from "@scalex-api/api-resources";
import { configs } from "./environment";
import { bootstrapEventsHandler, MainRouter } from "./handlers";

const app = constructScxExpressApp( {
	sentryDsn: configs.sentryDsn,
	router: MainRouter,
	env: configs.env,
	dbUrl: configs.dbUrl,
} );

bootstrapEventsHandler();

const server = app.listen( configs.port, '::', () => {
	console.log( `ID [ ready ] on ::${configs.port}` );
} );

process.on( 'SIGINT', () => {
	server.close( () => {
		process.exit( 0 );
	} );
} );
