import { scxExec } from "@scalex-api/api-resources";
import { authenticateUser } from "@scalex-api/id-functions";
import { AuthUserResource, AuthVerificationResource, ScxRequest } from "@scalex-api/sdk";
import { Router, Response } from "express";
import { oauthConfig, secrets } from "../../environment";

const authRouter = Router();

authRouter[AuthUserResource.method](
	AuthUserResource.path,
	( req: ScxRequest, res: Response ) => {
		return scxExec(
			authenticateUser,
			res,
			{
				req,
				res,
				jwtSecret: secrets.jwt,
				isOauthVerificationRequest: false,
				oauthCreds: oauthConfig
			}
		);
	}
);

authRouter[AuthVerificationResource.method](
	AuthVerificationResource.path,
	( req: ScxRequest, res: Response ) => {
		return scxExec(
			authenticateUser,
			res,
			{
				req,
				res,
				jwtSecret: secrets.jwt,
				isOauthVerificationRequest: true,
				oauthCreds: oauthConfig,
				verificationCode: req.query.code as string
			}
		);
	} );

export {
	authRouter
};