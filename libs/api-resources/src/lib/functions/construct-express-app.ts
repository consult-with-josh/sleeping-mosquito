import Sentry = require( "@sentry/node" );
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import express = require( "express" );
import { Router, urlencoded, json, Request, Response, NextFunction } from 'express';
import cors = require( 'cors' );
import cookieParser = require( 'cookie-parser' );
import { mw } from 'request-ip';
import { express as expressUserAgent } from 'express-useragent';
import { AppEnvironments } from "../constants";
import { corsConfig } from "./queue/cors-config.function";
import { connect } from "mongoose";
import { log } from "console";
import { limitToHundredPerFifteenMins } from "../middlewares";
import { catchAllErrors } from "./catch-all-errors.function";

interface ScalexExpressAppOptions {
  sentryDsn: string;
  router: Router;
	env: AppEnvironments;
	dbUrl?: string;
}

export function constructScxExpressApp( {
	sentryDsn,
	router,
	env,
	dbUrl,
}: ScalexExpressAppOptions ): express.Application {
	const app = express();

	app.use( urlencoded( {
		extended: true,
	} ) );

	app.use( json() );
	app.use( mw() );
	app.use( expressUserAgent() );
	app.use( cors( {
		origin: ( origin, callback ) => corsConfig( origin, callback, env ),
		credentials: true
	} ) );
	app.use( cookieParser() );
	app.use( limitToHundredPerFifteenMins() );
	app.use( router );
	app.use( ( err: unknown, req: Request, res: Response, next: NextFunction ) => {
		catchAllErrors( err, req, res, next );
	} );

	if ( dbUrl ){
		connect( dbUrl, {
			authSource: "admin",
			retryWrites: true,
			w: "majority",
		} )
			.then( () => log( 'db connect successful' ) )
			.catch( e => log( 'db connect failed', e ) );
	}

	Sentry.init( {
		dsn: sentryDsn,
		integrations: [
			nodeProfilingIntegration()
		],
		tracesSampleRate: 1.0,
		profilesSampleRate: 1.0,
	} );
	return app;
}
