import { NextFunction, Response } from "express";
import { AcceptedHeaders } from "../functions";
import { GenericErrors, ScxRequest } from "@scalex-africa/types";
import { HttpStatusCode } from "axios";
import { Ramp } from "@scalex-api/db";

export async function validateRampSession() {
	return async ( req: ScxRequest, res: Response, next: NextFunction ) => {
		try {
			const sessionId = req.headers[AcceptedHeaders.SessionId] as string;

			if ( !sessionId ) {
				throw GenericErrors.invalidRequest( 'Session ID is required.' );
			}

			const rampSession = await Ramp.model.findOne( { session: sessionId } );

			if ( !rampSession ) {
				throw GenericErrors.invalidRequest( 'Invalid session ID.' );
			}

			next();

		} catch ( error ) {
			res.status( error.statusCode ?? HttpStatusCode.InternalServerError ).json(
				error.statusCode ?
					( error.error ?? error ) :
					GenericErrors.internalServerError( 'Could not validate app credentials.' )
			);
		}
	};
}
