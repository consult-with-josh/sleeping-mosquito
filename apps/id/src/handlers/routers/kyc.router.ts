import { scxExec, validateRequestPart } from "@scalex-api/api-resources";
import { createKycStage, deleteKycStage, getKycStage, listKycStages, updateKycStage } from "@scalex-api/id-functions"
import { CreateKycStageDto, CreateKycStageResource, DeleteKycStageResource, GetKycStageResource, HasQueryIdDto, ListKycStageResource, ScxRequest, UpdateKycStageDto, UpdateKycStageResource } from "@scalex-api/sdk";
import { Response, Router } from "express";

const kycRouter = Router();

kycRouter[CreateKycStageResource.method](
	CreateKycStageResource.path,
	validateRequestPart( CreateKycStageDto ),
	( req: ScxRequest, res: Response ) => {
		return scxExec(
			createKycStage,
			res,
			{ payload: req.body }
		);
	}
);

kycRouter[UpdateKycStageResource.method](
	UpdateKycStageResource.path,
	validateRequestPart( HasQueryIdDto, 'query' ),
	validateRequestPart( UpdateKycStageDto ),
	( req: ScxRequest, res: Response ) => {
		return scxExec(
			updateKycStage,
			res,
			{
				payload: {
					body: req.body,
					query: req.query as unknown as HasQueryIdDto
				}
			}
		);
	}
);

kycRouter[ListKycStageResource.method](
	ListKycStageResource.path,
	( _: ScxRequest, res: Response ) => {
		return scxExec(
			listKycStages,
			res,
		);
	}
);

kycRouter[GetKycStageResource.method](
	GetKycStageResource.path,
	validateRequestPart( HasQueryIdDto, 'query' ),
	( req: ScxRequest, res: Response ) => {
		return scxExec(
			getKycStage,
			res,
			{
				payload: {
					query: req.query as unknown as HasQueryIdDto
				}
			}
		);
	}
);

kycRouter[DeleteKycStageResource.method](
	DeleteKycStageResource.path,
	validateRequestPart( HasQueryIdDto, 'query' ),
	( req: ScxRequest, res: Response ) => {
		return scxExec(
			deleteKycStage,
			res,
			{
				payload: {
					query: req.query as unknown as HasQueryIdDto
				}
			}
		);
	}
);

export {
	kycRouter
};