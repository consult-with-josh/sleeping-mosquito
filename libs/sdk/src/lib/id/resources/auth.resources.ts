import { IsEmail, IsString, IsUrl, Length, MinLength } from "class-validator";
import { AuthBasePath } from "./paths.config";
import { CookieStructure, HttpMethods, IEmptyResponse, ScxEndpoint, ScxEndpoints } from "../../generic";
import { IUser } from "../interfaces";

export class LocalAuthDto {
    @IsEmail()
    	email!: string;

    @IsString()
    @MinLength( 8 )
    	password!: string;
}

export class OauthAuthDto {
	@IsUrl( { require_tld: false } )
		redirectUrl!: string;
}

export class RequestPasswordResetOtpDto {
    @IsEmail()
    	email!: string;
}

export class ResetPasswordDto {
	@IsString()
	@Length( 6 )
		otp!: string;

	@IsString()
	@MinLength( 8 )
		newPassword!: string;

	@IsString()
	@MinLength( 8 )
		confirmNewPassword!: string;
}

type AuthRes = {
  cookies?: Array<CookieStructure>;
  user?: Partial<IUser>;
	link?: string;
	nextStep?: unknown;
	allowedServices?: {
		transactions?: {
			limits: {
				month: { onramp: number, offramp: number, totalTransacted: number },
				year: { onramp: number, offramp: number, totalTransacted: number }
			}
		}
	};
}

export const AuthMethodKey = 'method';
export const AuthUserResource = new ScxEndpoint<LocalAuthDto, AuthRes>( {
	path: `/init/:${AuthMethodKey}`,
	fullPath: `${AuthBasePath}/init/:${AuthMethodKey}`,
	method: HttpMethods.Post
} );

export const AuthVerificationResource = new ScxEndpoint<LocalAuthDto, AuthRes>( {
	path: `/verify/:${AuthMethodKey}`,
	fullPath: `${AuthBasePath}/verify/:${AuthMethodKey}`,
	method: HttpMethods.Get
} );

export const RequestPasswordResetResource = new ScxEndpoint<RequestPasswordResetOtpDto, IEmptyResponse>( {
	path: '/passwords',
	fullPath: `${AuthBasePath}/passwords`,
	method: HttpMethods.Put
} );

export const ResetPasswordResource = new ScxEndpoint<ResetPasswordDto, IEmptyResponse>( {
	path: '/passwords',
	fullPath: `${AuthBasePath}/passwords`,
	method: HttpMethods.Post
} );

export type AuthResourceKeys = {
  AuthVerificationResource: string,
  RequestPasswordResetResource: string,
  ResetPasswordResource: string,
}

export const AuthEndpoints: ScxEndpoints<AuthResourceKeys> = {
	AuthVerificationResource: AuthVerificationResource,
	RequestPasswordResetResource: RequestPasswordResetResource,
	ResetPasswordResource: ResetPasswordResource
};
