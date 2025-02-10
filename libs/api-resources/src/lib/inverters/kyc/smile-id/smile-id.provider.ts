import { IUser, KycApplicationStatus, KycDoc, KycProvider } from "@scalex-api/sdk";
import { createSmileVerificationLink, getSmileJobStatus, SmileIdAuth } from "./integration";
import { KycApi } from "../kyc-api.types";
import { ScalexLinks } from "../../../interfaces";

export class SmileIdApi extends KycApi<SmileIdAuth> {
	constructor( auth: SmileIdAuth, links: ScalexLinks ) {
		super( auth, KycProvider.smileIdentity, links );
	}

	async startApplication( doc: KycDoc, user: IUser ) {
		const { data } = await createSmileVerificationLink( doc, this.auth, this.links, user );
		return {
			link: data.link,
			ref: data.ref_id
		};
	}

	async fetchApplication( ref: string, userId: string ) {
		const { data } = await getSmileJobStatus( this.auth, userId, ref );
		return {
			status: data.job_success ? KycApplicationStatus.approved : KycApplicationStatus.rejected
		};
	}
}