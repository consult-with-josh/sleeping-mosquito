import { AuthenticationMethods, AuthMethodKey, ScxErrors } from "@scalex-api/sdk";

export function checkAuthMethod( params: Record<string, string> ): AuthenticationMethods {
	const authMethod = params[AuthMethodKey];
	if ( !authMethod || !Object.keys( AuthenticationMethods ).includes( authMethod ) ) {
		throw ScxErrors.invalidAuthMethod();
	}

	return authMethod as AuthenticationMethods;
}
