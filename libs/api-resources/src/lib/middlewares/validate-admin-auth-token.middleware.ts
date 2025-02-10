import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";
import { AcceptedHeaders } from "../functions";
import { log } from "console";

export const validateAdminAuthToken = (
	envAdminToken: string,
) => {
	return ( req: Request, res: Response, next: NextFunction ) => {
		try {
			const adminAuthToken = req.headers[AcceptedHeaders.AdminAuthToken];
			if ( !adminAuthToken ) throw {
				message: `No auth token set`
			};
			if ( adminAuthToken !== envAdminToken ) throw {
				message: `Invalid token set`
			};
			next();
		} catch ( e ) {
			log( e );
			res.status( HttpStatusCode.Forbidden ).json( {
				message: "Forbidden resource",
			} );
		}
	};
};
