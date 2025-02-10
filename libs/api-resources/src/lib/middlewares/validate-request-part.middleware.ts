import { validateOrReject } from "class-validator";
import { HttpStatusCode } from "axios";
import { NextFunction, Request, Response } from "express";
import { ScxErrors } from "@scalex-api/sdk";
import { plainToInstance } from "class-transformer";
import { ZodSchema } from "zod";
import { GenericErrors } from "@scalex-africa/types";

export interface IValidationType<T> {
	new (): T;
}

export async function validateDto( DtoType: IValidationType<object>, body: unknown, whitelist = true ) {
	const payload = plainToInstance( DtoType, body );
	try {
		await validateOrReject( payload, {
			whitelist,
			forbidNonWhitelisted: true,
		} );
	} catch ( e ) {
		throw ScxErrors.invalidPayload( e );
	}
}

export const validateRequestPart = <T extends object>( DtoType: IValidationType<T>, part: 'body' | 'query' = 'body', whitelist = true ) => {
	return ( req: Request, res: Response, next: NextFunction ) => {
		const payload = plainToInstance( DtoType, req[part] );
		validateOrReject( payload as object, {
			whitelist,
			forbidNonWhitelisted: true,
		} )
			.then( () => {
				next();
			} )
			.catch( e => {
				console.log( e );
				res.status( HttpStatusCode.BadRequest ).json( {
					message: "Some invalid data was provided",
					errors: e
				} );
				throw ScxErrors.invalidPayload( e );
			} );
	};
};

type ReqPart = "body" | "query" | "params";

export const validateZodSch = ( sch: ZodSchema, part: ReqPart = "body" ) => {
	return ( req: Request, res: Response, next: NextFunction ) => {
		try {
			sch.parse( req[part] );
			next();
		} catch ( e ) {
			return res.status( HttpStatusCode.BadRequest ).json( GenericErrors.badRequest( e ) );
		}
	};
};