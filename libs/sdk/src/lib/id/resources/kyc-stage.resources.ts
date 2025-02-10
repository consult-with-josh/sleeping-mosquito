import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { IKycStage, KycDoc } from "../interfaces";
import { Type } from "class-transformer";
import { ActiveOrInactive, HasQueryIdDto, HttpMethods, ScxEndpoint, ScxEndpoints } from "../../generic";
import { PartialType } from '@nestjs/mapped-types';
import { KycBasePath } from "./paths.config";

export class AccountTxLimitsDto {
	@IsOptional()
	@IsNumber()
		singleTransactionLimit?: number;

	@IsOptional()
	@IsNumber()
		walletBalanceLimit?: number;

	@IsOptional()
	@IsNumber()
		monthlyMax?: number;

	@IsOptional()
	@IsNumber()
		dailyMax?: number;

	@IsOptional()
	@IsNumber()
		weeklyMax?: number;

	@IsOptional()
	@IsNumber()
		quarterlyMax?: number;

	@IsOptional()
	@IsNumber()
		yearlyMax?: number;
}

export class CreateKycStageDto {
	@IsString()
		name: string;

	@IsOptional()
	@IsString()
		description?: string;

	@IsArray()
	@IsEnum( KycDoc, { each: true } )
		acceptedDocs: KycDoc[];

	@IsOptional()
	@ValidateNested()
	@Type( () => AccountTxLimitsDto )
		individualUSDLimit?: AccountTxLimitsDto;

	@IsOptional()
	@ValidateNested()
	@Type( () => AccountTxLimitsDto )
		businessUSDLimit?: AccountTxLimitsDto;

	@IsEnum( ActiveOrInactive )
		status: ActiveOrInactive;
}

export class UpdateKycStageDto extends PartialType( CreateKycStageDto ) {}

export interface KycStageRes {
	kycStage: IKycStage;
}

export interface ListKycStageRes {
	kycStages: Array<IKycStage>;
}

export const CreateKycStageResource = new ScxEndpoint<CreateKycStageDto, KycStageRes>( {
	path: '/stages',
	fullPath: `${KycBasePath}/stages`,
	method: HttpMethods.Post,
} );

export const ListKycStageResource = new ScxEndpoint<null, ListKycStageRes>( {
	path: '/stages',
	fullPath: `${KycBasePath}/stages`,
	method: HttpMethods.Get,
} );

export const GetKycStageResource = new ScxEndpoint<HasQueryIdDto, KycStageRes>( {
	path: '/stages/:id',
	fullPath: `${KycBasePath}/stages/:id`,
	method: HttpMethods.Get,
} );

export const UpdateKycStageResource = new ScxEndpoint<UpdateKycStageDto, KycStageRes>( {
	path: '/stages/:id',
	fullPath: `${KycBasePath}/stages/:id`,
	method: HttpMethods.Put,
} );

export const DeleteKycStageResource = new ScxEndpoint<HasQueryIdDto, null>( {
	path: '/stages/:id',
	fullPath: `${KycBasePath}/stages/:id`,
	method: HttpMethods.Delete,
} );

export type KycResourceKeys = {
  CreateKycStageResource: string,
  ListKycStageResource: string,
  GetKycStageResource: string,
  UpdateKycStageResource: string,
  DeleteKycStageResource: string,
}

export const KycEndpoints: ScxEndpoints<KycResourceKeys> = {
	CreateKycStageResource: CreateKycStageResource,
	ListKycStageResource: ListKycStageResource,
	GetKycStageResource: GetKycStageResource,
	UpdateKycStageResource: UpdateKycStageResource,
	DeleteKycStageResource: DeleteKycStageResource
};
