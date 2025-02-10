import { AuthenticationMethods, OauthAuthDto, ScxErrors } from "@scalex-api/sdk";

export function getOauthUrl( oauthClient: AuthenticationMethods, payload: OauthAuthDto, clientId: string ) {
	switch ( oauthClient ) {
	case AuthenticationMethods.google:
		return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${payload.redirectUrl}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
	default:
		throw ScxErrors.unsupportedAuthMethod();
	}
}