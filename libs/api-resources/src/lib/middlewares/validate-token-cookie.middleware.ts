import { CookieKey, DecodedToken, ScxError, ScxRequest, TokenActions } from "@scalex-api/sdk";
import { HttpStatusCode } from "axios";
import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";

export const invalidOrExpiredToken: ScxError = {
	statusCode: HttpStatusCode.Unauthorized,
	message: "You're logged out",
	recommendedActions: ["Login with your credentials and try again"],
};

export function validateTokenCookie(
	jwtSecret: string,
	actions: Array<TokenActions> = [ TokenActions.fullAuth ]
) {
	return ( req: ScxRequest, res: Response, next: NextFunction ) => {
		const token = req.cookies[CookieKey.authToken];
		try {
			if ( token ) {
				const decodedToken = verify( token, jwtSecret ) as DecodedToken;
				if ( actions.some( x => decodedToken.actions.includes( x ) ) ) {
					req.user = decodedToken.user;
					req.action = decodedToken.currentState;
					return next();
				}
			}
			return res.status( HttpStatusCode.Unauthorized ).json( invalidOrExpiredToken );
		} catch ( e ) {
			return res.status( HttpStatusCode.Unauthorized ).json( invalidOrExpiredToken );
		}
	};
}

export function booleanValidateTokenFromHeader(
	req: ScxRequest,
	jwtSecret: string,
	actions: Array<TokenActions> = [ TokenActions.verifyEmail ]
) {
	try {
		const token = req.cookies[CookieKey.authToken];
		if ( token ) {
			const decodedToken = verify( token, jwtSecret ) as DecodedToken;
			if ( actions.some( x => decodedToken.actions.includes( x ) ) ) {
				req.user = decodedToken.user;
				req.action = decodedToken.currentState;
				return true;
			}
			return false;
		}
	} catch {
		return false;
	}
}

export function checkForAvailableToken(
	jwtSecret: string,
) {
	return ( req: ScxRequest, res: Response, next: NextFunction ) => {
		const token = req.cookies[CookieKey.authToken];
		try {
			if ( token ) {
				const decodedToken = verify( token, jwtSecret ) as DecodedToken;
				req.user = decodedToken.user;
				req.action = decodedToken.currentState;
			}
		} catch ( e ) {
			console.log( e );
			req.user = null;
		}

		return next();
	};
}
