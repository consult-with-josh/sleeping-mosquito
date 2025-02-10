import { IUser, KycApplicationStatus, KycDoc, KycProvider } from "@scalex-api/sdk";
import { ScalexLinks } from "../../interfaces";

export type InitiatedKycRes = {
	link?: string;
	ref: string;
}

export type FetchedKycRes = {
	status: KycApplicationStatus;
}

export abstract class KycApi<AuthType = unknown> {
	auth: AuthType;
	provider: KycProvider;
	links: ScalexLinks;

	constructor( auth: AuthType, provider: KycProvider, links: ScalexLinks ) {
		this.auth = auth;
		this.provider = provider;
		this.links = links;
	}

	abstract startApplication( doc: KycDoc, user: Partial<IUser> ): Promise<InitiatedKycRes>;
	abstract fetchApplication( ref: string, userId: string ): Promise<FetchedKycRes>;
}