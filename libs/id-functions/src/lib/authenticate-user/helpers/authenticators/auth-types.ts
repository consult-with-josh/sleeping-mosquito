import { OauthCred } from "@scalex-api/api-resources";
import { AuthenticationMethods, IOauthProfile, IUser } from "@scalex-api/sdk";

export type CreateUserAccountArgs = {
	firstName?: string;
	lastName?: string;
	emailVerified: boolean;
	source?: AuthenticationMethods;
	oauthProfile?: IOauthProfile;
	profilePicture?: string;
	email: string;
	password?: string;
}

export abstract class OauthProvider {
	creds: OauthCred;
	constructor( creds: OauthCred ) {
		this.creds = creds;
	}

	abstract getToken( code: string ): Promise<IOauthProfile>;
	abstract getUserInfo( profile: IOauthProfile ): Promise<Partial<IUser>>;
}
