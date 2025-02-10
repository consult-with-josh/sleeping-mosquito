import { Request } from "express";
import { ScxError } from "./error.response";
import { Lookup } from "geoip-lite";
import { UserAgent } from 'express-useragent';
import { HttpStatusCode } from "axios";
import { IUser } from "../../id";

export enum TokenActions {
	verifyEmail = 'verify-email',
	createProfile = 'create-profile',
	doKyc = 'do-kyc',
	fullAuth = 'full-auth',
}

export enum KycDocs {
	idCard = 'id-card',
	passport = 'passport',
	driverLicense = 'driver-license',
}

export const TxKycConfig = [
	{
		range: { from: 0, to: 50 },
		acceptedPrerequisites: [KycDocs.idCard],
		requiredDocs: [KycDocs.idCard]
	},
	{
		range: { from: 50, to: 250 },
		acceptedPrerequisites: [KycDocs.idCard],
		requiredDocs: [KycDocs.idCard, KycDocs.passport]
	}
];

export const TokenExpiry: {
	[key in TokenActions]: string;
} = {
	[TokenActions.verifyEmail]: '15m',
	[TokenActions.createProfile]: '15m',
	[TokenActions.doKyc]: '1d',
	[TokenActions.fullAuth]: '1d',
};

export const ServiceDenialActions: {
	[key in TokenActions]: boolean;
} = {
	[TokenActions.verifyEmail]: true,
	[TokenActions.createProfile]: true,
	[TokenActions.doKyc]: false,
	[TokenActions.fullAuth]: false
};

export interface ApiRes<T> {
	statusCode: HttpStatusCode;
	code?: string;
	error?: ScxError;
	message: string;
	data?: T;
}

export enum CookieKey {
	authToken = '_xfn_',
}

export type CookieStructure = {
	key: CookieKey;
	value: string;
}

export type DecodedToken = {
	user: unknown;
	actions: Array<TokenActions>;
	currentState: TokenActions;
	domain?: string
}

export type AppCredentials = {
	appId: string;
	publishableKey: string;
	secretKey: string;
}

type ScxRequestProps = {
	clientIp: string;
	location: Lookup;
	useragent: UserAgent;
	user: Partial<IUser>;
	action: TokenActions;
	domain?: string,
	appCredentials?: AppCredentials
}

export type ScxRequest = Request & ScxRequestProps
