import { KycStage, notifyClientOfSuccess, throwScalexError } from "@scalex-api/api-resources";
import { CreateKycStageDto, CreateKycStageResource, GetKycStageResource, HasQueryIdDto, ListKycStageResource, ScxErrors, ScxSuccessRes, UpdateKycStageResource } from "@scalex-api/sdk";

type CreateKycStageArgs = {
	payload: CreateKycStageDto
}

export async function createKycStage( args: CreateKycStageArgs ): Promise<typeof CreateKycStageResource.response> {
	try {
		const existingKycStage = await KycStage.model.findOne( { name: args.payload.name } );
		if ( existingKycStage )
			throw ScxErrors.duplicateStageAlreadyExists();
		const kycStage = new KycStage.model( args.payload );
		await kycStage.save();
		return notifyClientOfSuccess( { data: { kycStage } } );
	} catch ( e ) {
		throwScalexError( e );
	}
}

type EditKycStageArgs = {
	payload: {
		body: Partial<CreateKycStageDto>;
		query: HasQueryIdDto;
	}
}

export async function updateKycStage( args: EditKycStageArgs ): Promise<typeof UpdateKycStageResource.response> {
	try {
		const kycStage = await KycStage.model.findByIdAndUpdate(
			args.payload.query.id,
			args.payload.body,
			{ new: true }
		);
		if ( !kycStage ) throw ScxErrors.resourceNotFound( 'KYC Stage' );
		return notifyClientOfSuccess( { data: { kycStage } } );
	} catch ( e ) {
		throwScalexError( e );
	}
}

export async function listKycStages(): Promise<typeof ListKycStageResource.response> {
	try {
		const kycStages = await KycStage.model.find().sort( { createdAt: -1 } );
		return notifyClientOfSuccess( { data: { kycStages } } );
	} catch ( e ) {
		throwScalexError( e );
	}
}

type GetKycStageArgs = {
	payload: {
		query: HasQueryIdDto;
	}
}

export async function getKycStage( args: GetKycStageArgs ): Promise<typeof GetKycStageResource.response> {
	try {
		const kycStage = await KycStage.model.findById( args.payload.query.id );
		if ( !kycStage ) throw ScxErrors.resourceNotFound( 'KYC Stage' );
		return notifyClientOfSuccess( { data: { kycStage } } );
	} catch ( e ) {
		throwScalexError( e );
	}
}

export async function deleteKycStage( args: GetKycStageArgs ): Promise<ScxSuccessRes> {
	try {
		const kycStage = await KycStage.model.findByIdAndDelete( args.payload.query.id );
		if ( !kycStage ) throw ScxErrors.resourceNotFound( 'KYC Stage' );
		return notifyClientOfSuccess( { data: { message: 'KYC Stage deleted successfully' } } );
	} catch ( e ) {
		throwScalexError( e );
	}
}