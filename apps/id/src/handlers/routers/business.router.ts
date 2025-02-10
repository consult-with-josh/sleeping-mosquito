import { CreateBusinessResource, GetBusinessResource, UpdateBusinessResource, ListBusinessesResource, ScxRequest } from "@scalex-africa/types";
import { scxExec, validateZodSch } from "@scalex-api/api-resources";
import { createBusiness, getBusiness, listBusinesses, updateBusiness } from "@scalex-api/id-functions";
import { Router, Response } from "express";
const businessRouter = Router();

businessRouter[CreateBusinessResource.method](
	CreateBusinessResource.path,
	validateZodSch( CreateBusinessResource.schema.body ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( createBusiness, res, {
			payload: {
				body: req.body
			}
		} );
	}
);

businessRouter[GetBusinessResource.method](
	GetBusinessResource.path,
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( getBusiness, res, {
			payload: {
				query: req.query
			}
		} );
	}
);

businessRouter[UpdateBusinessResource.method](
	UpdateBusinessResource.path,
	validateZodSch( UpdateBusinessResource.schema.body ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( updateBusiness, res, {
			payload: {
				body: req.body,
				query: req.query
			}
		} );
	}
);

businessRouter[ListBusinessesResource.method](
	ListBusinessesResource.path,
	validateZodSch( ListBusinessesResource.schema.query ),
	async ( req: ScxRequest, res: Response ) => {
		await scxExec( listBusinesses, res, {
			payload: {
				query: req.query
			}
		} );
	}
);

export { businessRouter };