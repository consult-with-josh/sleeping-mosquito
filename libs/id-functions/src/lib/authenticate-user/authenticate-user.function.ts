import { notifyClientOfSuccess, OauthCreds, throwScalexError, validateDto } from "@scalex-api/api-resources";
import { AuthenticationMethods, AuthUserResource, ScxRequest } from "@scalex-api/sdk";
import { Response } from 'express';
import { checkAuthMethod, getOauthUrl, PayloadAuthMap, validateUserAndIssueToken, verifyOauthLogin } from "./helpers";

export type AuthenticateUserArgs = {
	req: ScxRequest;
  res: Response;
	jwtSecret: string;
	isOauthVerificationRequest: boolean;
	oauthCreds: OauthCreds;
	verificationCode?: string;
};

export async function authenticateUser(
	args: AuthenticateUserArgs
): Promise<typeof AuthUserResource.response> {
	try {
		const authMethod = checkAuthMethod( args.req.params );
		if ( !args.isOauthVerificationRequest ) await validateDto( PayloadAuthMap[ authMethod ], args.req.body );
		if ( [AuthenticationMethods.local].includes( authMethod ) ) {
			return validateUserAndIssueToken( authMethod, args.req.body, args.jwtSecret );
		} else if ( !args.isOauthVerificationRequest ) {
			const link = getOauthUrl( authMethod, args.req.body, args.oauthCreds[ authMethod ].clientId );
			return notifyClientOfSuccess( { data: { link } } );
		} else {
			return verifyOauthLogin( {
				method: authMethod,
				verificationCode: args.verificationCode,
				creds: args.oauthCreds,
				jwtSecret: args.jwtSecret
			} );
		}
	} catch ( e ) {
		console.log( e );
		throwScalexError( e );
	}
}
