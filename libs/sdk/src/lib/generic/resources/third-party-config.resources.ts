import { HasQueryIdDto, HasQuerySlugDto } from "../dtos";
import { IThirdPartyConfig } from "../entities";
import { ActiveOrInactive, HttpMethods, ScxEndpoint } from "../utils";
import { ThirdPartyConfigBasePath } from "./paths.config";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ThirdPartyService } from '../entities';
import { KycProvider } from "../../id";

export interface ListThirdPartyConfigsRes {
	configs: Array<IThirdPartyConfig>;
}

export interface ThirdPartyConfigRes {
	config: IThirdPartyConfig;
}

export class CreateThirdPartyConfigDto implements IThirdPartyConfig {
	@IsEnum( ThirdPartyService )
		service: ThirdPartyService;

	@IsEnum( KycProvider )
		provider: KycProvider;

	@IsArray()
	@IsString( { each: true } )
	@IsOptional()
		subServices?: Array<string>;

	@IsBoolean()
		forceSubServiceUsage: boolean;

	@IsEnum( ActiveOrInactive )
		status: ActiveOrInactive;
}

export class UpdateThirdPartyConfigDto implements Partial<IThirdPartyConfig> {
	@IsEnum( ThirdPartyService )
	@IsNotEmpty()
		service!: ThirdPartyService;

	@IsEnum( KycProvider )
	@IsOptional()
		provider?: KycProvider;

	@IsArray()
	@IsString( { each: true } )
	@IsOptional()
		subServices?: Array<string>;

	@IsBoolean()
	@IsOptional()
		forceSubServiceUsage?: boolean;

	@IsEnum( ActiveOrInactive )
	@IsOptional()
		status?: ActiveOrInactive;
}

export const ListThirdPartyConfigsResource = new ScxEndpoint<HasQuerySlugDto, ListThirdPartyConfigsRes>( {
	method: HttpMethods.Get,
	path: '/',
	fullPath: `${ThirdPartyConfigBasePath}/`,
} );

export const CreateThirdPartyConfigResource = new ScxEndpoint<CreateThirdPartyConfigDto, ThirdPartyConfigRes>( {
	method: HttpMethods.Post,
	path: '/',
	fullPath: `${ThirdPartyConfigBasePath}/`,
} );

export const UpdateThirdPartyConfigResource =
new ScxEndpoint<UpdateThirdPartyConfigDto, ThirdPartyConfigRes, HasQueryIdDto>( {
	method: HttpMethods.Put,
	path: '/',
	fullPath: `${ThirdPartyConfigBasePath}/`,
} );
