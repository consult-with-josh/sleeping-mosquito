import { AuthenticationMethods, IUser, LocalAuthDto } from "@scalex-api/sdk";
import { CreateUserAccountArgs } from "./auth-types";

export function interpolateAuthPayload(
	payload: unknown,
	method: AuthenticationMethods ): CreateUserAccountArgs {
	switch ( method ) {
	case AuthenticationMethods.local:
		return {
			email: ( payload as LocalAuthDto ).email,
			emailVerified: false,
			password: ( payload as LocalAuthDto ).password,
			source: AuthenticationMethods.local
		};
	case AuthenticationMethods.google:
		return {
			email: ( payload as IUser ).email,
			emailVerified: true,
			firstName: ( payload as IUser ).profile.firstName,
			lastName: ( payload as IUser ).profile.lastName,
			source: AuthenticationMethods.google,
			oauthProfile: ( payload as IUser ).oauthProfiles[0],
			profilePicture: ( payload as IUser ).profile.profilePicture
		};
	default:
		return null;
	}
	
}