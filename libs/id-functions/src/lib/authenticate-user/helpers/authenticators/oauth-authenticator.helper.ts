import { AuthenticationMethods, AuthUserResource, IUser, LocalAuthDto, ScxErrors } from "@scalex-api/sdk";
import { authenticateWithLocalStrategy } from "./auth-local.helper";
import { HydratedDocument } from "mongoose";
import { OauthCreds } from "@scalex-api/api-resources";
import { GoogleAuthProvider } from "./auth-google.helper";
import { OauthProvider } from "./auth-types";
import { checkAccountExists } from "./check-account-exists.helper";
import { createUserAccount } from "../create-account.helper";
import { interpolateAuthPayload } from "./interpolate-auth-payload.helper";
import { sendAuthDetails } from "../issuers";

export async function validateUserCredentials(
	method: AuthenticationMethods,
	payload: unknown,
	user: HydratedDocument<IUser>,
) {
	switch ( method ) {
	case AuthenticationMethods.local:
		return authenticateWithLocalStrategy( user, ( payload as LocalAuthDto ).password );
	default:
		throw ScxErrors.unsupportedAuthMethod();
	}
}

export async function verifyOauthLogin( payload: {
	method: AuthenticationMethods;
	verificationCode: string;
	creds: OauthCreds;
	jwtSecret: string;
} ): Promise<typeof AuthUserResource.response> {
	const providers: Record<AuthenticationMethods, OauthProvider> = {
		[AuthenticationMethods.google]: new GoogleAuthProvider( payload.creds.google ),
		[AuthenticationMethods.local]: undefined,
	};

	const provider = providers[payload.method];
	if ( !provider ) {
		throw ScxErrors.unsupportedAuthMethod();
	}
	const oauthProfile = await provider.getToken( payload.verificationCode );
	const user = await provider.getUserInfo( oauthProfile );
	let dbUser = await checkAccountExists( user.email );
	if ( dbUser ) {
		const existingOauthProfile = dbUser.oauthProfiles.find( ( p ) => p.provider === payload.method );
		if ( !existingOauthProfile ) {
			dbUser.oauthProfiles.push( { ...oauthProfile, provider: payload.method } );
			await dbUser.save();
		}
	} else {
		dbUser = await createUserAccount( interpolateAuthPayload( user, payload.method ) );
	}
	return sendAuthDetails( dbUser, payload.jwtSecret );
}