import { scxExec } from "@scalex-api/api-resources";
import { authenticateUser, requestPasswordReset, resetPassword } from "@scalex-api/id-functions";
import { AuthUserResource, AuthVerificationResource, ScxRequest, RequestPasswordResetResource, ResetPasswordResource } from "@scalex-api/sdk";
import { Router, Response } from "express";
import { oauthConfig, secrets, configs } from "../../environment";

const authRouter = Router();

const redisConfig = configs.redis;
const pusherConfig = configs.pusher;

authRouter[AuthUserResource.method](
	AuthUserResource.path,
	(req: ScxRequest, res: Response) => {
		return scxExec(authenticateUser, res, {
			req,
			res,
			jwtSecret: secrets.jwt,
			isOauthVerificationRequest: false,
			oauthCreds: oauthConfig,
		});
	}
);

authRouter[AuthVerificationResource.method](
	AuthVerificationResource.path,
	(req: ScxRequest, res: Response) => {
		return scxExec(authenticateUser, res, {
			req,
			res,
			jwtSecret: secrets.jwt,
			isOauthVerificationRequest: true,
			oauthCreds: oauthConfig,
			verificationCode: req.query.code as string,
		});
	}
);

authRouter.put(
	RequestPasswordResetResource.path,
	(req: ScxRequest, res: Response) => {
		return scxExec(requestPasswordReset, res, {
			req,
			res,
			cacheConfig: redisConfig,
			socketConfig: pusherConfig,
		});
	}
);

authRouter.post(
	ResetPasswordResource.path,
	(req: ScxRequest, res: Response) => {
		return scxExec(resetPassword, res, {
			req,
			res,
			cacheConfig: redisConfig,
			jwtSecret: process.env.JWT_SECRET,
		});
	}
);

export { authRouter };
