import { AuthUserResource, LocalAuthDto, AuthenticationMethods } from "@scalex-api/sdk";
import { validateUserCredentials, checkAccountExists, interpolateAuthPayload } from "./authenticators";
import { createUserAccount } from "./create-account.helper";
import { sendAuthDetails } from "./issuers";

export async function validateUserAndIssueToken(
	authMethod: AuthenticationMethods,
	payload: LocalAuthDto,
	jwtSecret: string
): Promise<typeof AuthUserResource.response> {
	let user = await checkAccountExists( payload.email );
	if ( !user ) {
		user = await createUserAccount( interpolateAuthPayload( payload, authMethod ) );
	} else {
		await validateUserCredentials( authMethod, payload, user );
	}
	return sendAuthDetails( user, jwtSecret );
}