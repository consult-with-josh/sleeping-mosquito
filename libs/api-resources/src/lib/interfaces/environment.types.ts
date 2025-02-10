export interface OauthCred {
	clientId: string;
	clientSecret: string;
	redirectUri: string;
}

export interface OauthCreds {
	google: OauthCred
}

export interface ScalexLinks {
	logo?: string;
	privacyPolicy?: string;
}