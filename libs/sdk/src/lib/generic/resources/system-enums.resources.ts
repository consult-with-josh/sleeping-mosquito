import { IsEnum, IsOptional } from "class-validator";
import { HttpMethods, ScxEndpoint } from "../utils";
import { SystemEnumsBasePath } from "./paths.config";

export interface ListSystemEnumRes<T = Record<SystemEnum, Array<string>>> {
	options: T
}

export enum SystemEnum {
	kycDocs = 'kyc-docs',
	thirdPartyService = 'third-party-service',
}

export class ListSystemEnumOptionsDto {
	@IsEnum( SystemEnum )
	@IsOptional()
		enum: SystemEnum;
}

export const ListSystemEnumOptionsResource = new ScxEndpoint<ListSystemEnumOptionsDto, ListSystemEnumRes>( {
	method: HttpMethods.Get,
	path: '/',
	fullPath: `${SystemEnumsBasePath}/`,
} );
