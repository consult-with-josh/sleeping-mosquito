import { AuthBasePath, KycBasePath, TokenActions } from "@scalex-api/sdk";
import { Response, Router } from "express";
import { appRouter, authRouter, businessRouter, kycRouter } from "./routers";
import { limitRequestsTo, TimeLimits, validateTokenCookie } from "@scalex-api/api-resources";
import { secrets } from "../environment";
import { AppsBasePath, BusinessesBasePath } from "@scalex-africa/types";

const MainRouter = Router();

MainRouter.get('/', (_, res: Response) => res.send('ok'));
MainRouter.use(AuthBasePath,
	limitRequestsTo(TimeLimits.fifteenMinutes, 5),
	[authRouter]
);

MainRouter.use( KycBasePath,
	validateTokenCookie( secrets.jwt, [ TokenActions.doKyc ] ),
	[ kycRouter ]
);

MainRouter.use(BusinessesBasePath,
	[businessRouter]
);

MainRouter.use(AppsBasePath,
	[appRouter]
);


export {
	MainRouter
};