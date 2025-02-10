import { ScxError } from "@scalex-api/sdk";
import { GenericErrors } from "../constants";
import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "axios";

export const catchAllErrors = ( e: unknown, _req: Request, res: Response, next: NextFunction ) => {
	if ( res.headersSent ) {
		return next( e );
	}
	const scalexErr = e as ScxError;
	if ( scalexErr.statusCode && scalexErr.message ) {
		res.status( scalexErr.statusCode ).json( scalexErr );
		return next( e );
	}
	res.status( HttpStatusCode.InternalServerError ).json( GenericErrors.unidentifiedError( e ) );
};