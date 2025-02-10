import { ScxRequest } from "@scalex-api/sdk";
import { NextFunction, Response } from "express";
import { lookup } from 'geoip-lite';

export function getRequestLocation() {
	return async ( req: ScxRequest, _res: Response, next: NextFunction ) => {
		try {
			req.location = lookup( req.clientIp );
			next();
		} catch ( e ) {
			console.log( 'location error', e );
			next();
		}
	};
}
