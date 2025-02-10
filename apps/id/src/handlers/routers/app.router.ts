import { CreateAppResource, GetAppResource, UpdateAppResource, ListAppsResource, ScxRequest, ListAppCredentialsConfigResource, CreateAppCredentialsConfigResource, ListAppCredentialsResource } from "@scalex-africa/types";
import { scxExec, validateZodSch } from "@scalex-api/api-resources";
import { createApp, createAppCredential, getApp, listAppCredConfig, listAppCredentials, listApps, updateApp } from "@scalex-api/id-functions";
import { Router, Response } from "express";

const appRouter = Router();

appRouter[CreateAppResource.method](
	CreateAppResource.path,
	validateZodSch( CreateAppResource.schema.body ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( createApp, res, {
			payload: {
				body: req.body
			}
		} );
	}
);

appRouter[GetAppResource.method](
	GetAppResource.path,
	validateZodSch( GetAppResource.schema.query, 'query' ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( getApp, res, {
			payload: {
				query: req.query
			}
		} );
	}
);

appRouter[UpdateAppResource.method](
	UpdateAppResource.path,
	validateZodSch( UpdateAppResource.schema.body ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( updateApp, res, {
			payload: {
				body: req.body,
				query: req.query
			}
		} );
	}
);

appRouter[ListAppsResource.method](
	ListAppsResource.path,
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( listApps, res, {
			payload: {
				query: req.query
			}
		} );
	}
);

appRouter[ListAppCredentialsConfigResource.method](
	ListAppCredentialsConfigResource.path,
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( listAppCredConfig, res );
	}
);

appRouter[ListAppCredentialsResource.method](
	ListAppCredentialsResource.path,
	validateZodSch( ListAppCredentialsResource.schema.query, 'query' ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( listAppCredentials, res, {
			payload: {
				query: req.query
			}
		} );
	}
);

appRouter[CreateAppCredentialsConfigResource.method](
	CreateAppCredentialsConfigResource.path,
	validateZodSch( CreateAppCredentialsConfigResource.schema.body ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( createAppCredential, res, { payload: { body: req.body } } );
	}
);

export { appRouter };
