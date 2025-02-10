import { IsEnum } from "class-validator";
import { KycApplicantType, KycDoc } from "../interfaces";
import { HttpMethods, ScxEndpoint } from "../../generic";
import { KycBasePath } from "./paths.config";

export class InitiateKycDto {
	@IsEnum( KycDoc )
		doc: KycDoc;

	@IsEnum( KycApplicantType )
		applicantType: KycApplicantType;
}

export interface InitiateKycRes<T = unknown> {
	fields: T
}

export const InitiateKycResource = new ScxEndpoint<InitiateKycDto, InitiateKycRes>( {
	method: HttpMethods.Post,
	path: '/initiate',
	fullPath: `${KycBasePath}/initiate`,
} );

export interface ListKycsRes {
	kycs: Array<unknown>
}

export class FilterKycDto {
	@IsEnum( KycDoc )
		doc: KycDoc;
}

export const ListKycsResource = new ScxEndpoint<FilterKycDto, ListKycsRes>( {
	method: HttpMethods.Get,
	path: '/',
	fullPath: `${KycBasePath}/`,
} );