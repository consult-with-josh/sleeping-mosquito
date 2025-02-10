import { IValidationType } from "@scalex-api/api-resources";
import { AuthenticationMethods, LocalAuthDto, OauthAuthDto } from "@scalex-api/sdk";

export const PayloadAuthMap: {
	[key in AuthenticationMethods]: IValidationType<object>;
} = {
	[AuthenticationMethods.local]: LocalAuthDto,
	[AuthenticationMethods.google]: OauthAuthDto,
};