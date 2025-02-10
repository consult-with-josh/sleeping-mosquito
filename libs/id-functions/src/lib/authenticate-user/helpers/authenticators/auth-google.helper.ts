import { AuthenticationMethods, HttpMethods, IOauthProfile, IUser, ScxEndpoints } from "@scalex-api/sdk";
import { OauthProvider } from "./auth-types";
import { callApi, OauthCred } from "@scalex-api/api-resources";

const GoogleOauthEndpointKeys = {
	getToken: '/token',
};

const GoogleEndpointKeys = {
	getUserInfo: '/oauth2/v1/userinfo',
};

type GoogleOauthTokenRes = {
	access_token: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
	token_type: string;
	id_token: string;
};

type GoogleOauthTokenReq = {
	client_id: string;
	client_secret: string;
	code: string;
	grant_type: 'authorization_code';
	redirect_uri: string;
};

type GoogleUserInfo = {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
}

export const GoogleOauthEndpoints: ScxEndpoints<typeof GoogleOauthEndpointKeys> = {
	getToken: {
		path: GoogleOauthEndpointKeys.getToken,
		fullPath: GoogleOauthEndpointKeys.getToken,
		method: HttpMethods.Post
	}
};

export const GoogleEndpoints: ScxEndpoints<typeof GoogleEndpointKeys> = {
	getUserInfo: {
		path: GoogleEndpointKeys.getUserInfo,
		fullPath: GoogleEndpointKeys.getUserInfo,
		method: HttpMethods.Get,
	}
};

export class GoogleAuthProvider extends OauthProvider {
	constructor( creds: OauthCred ) {
		super( creds );
	}

	async getToken( code: string ): Promise<IOauthProfile> {
		const details = await callApi<GoogleOauthTokenReq, GoogleOauthTokenRes>( {
			endpoint: GoogleOauthEndpoints.getToken,
			serviceUri: `https://oauth2.googleapis.com`,
			body: {
				client_id: this.creds.clientId,
				client_secret: this.creds.clientSecret,
				code,
				grant_type: 'authorization_code',
				redirect_uri: this.creds.redirectUri,
			}
		}, true );
		return {
			scope: details.data.scope,
			provider: AuthenticationMethods.google,
			accessToken: details.data.access_token,
			refreshToken: details.data.refresh_token,
		};
	}

	async getUserInfo( profile: IOauthProfile ): Promise<Partial<IUser>> {
		const userInfo = await callApi<null, GoogleUserInfo>( {
			endpoint: GoogleEndpoints.getUserInfo,
			serviceUri: `https://www.googleapis.com`,
			headers: {
				Authorization: `Bearer ${profile.accessToken}`,
			},
		}, true );
		return {
			oauthProfiles: [
				{
					provider: AuthenticationMethods.google,
					scope: profile.scope
				}
			],
			profile: {
				firstName: userInfo.data.given_name,
				lastName: userInfo.data.family_name,
				profilePicture: userInfo.data.picture,
			},
			email: userInfo.data.email,
		}; 
	  }
}