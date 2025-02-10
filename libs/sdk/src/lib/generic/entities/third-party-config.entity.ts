import { KycProvider } from "../../id";
import { IBaseModel } from "../models";
import { ActiveOrInactive } from "../utils";

export enum ThirdPartyService {
	kyc = 'kyc',
}

export const ThirdPartyServiceProviders = {
	[ThirdPartyService.kyc]: {
		smileIdentity: KycProvider.smileIdentity,
	}
};

export interface IThirdPartyConfig extends IBaseModel {
	service: ThirdPartyService;
	provider: KycProvider;
	subServices?: Array<string>;
	forceSubServiceUsage: boolean;
	status: ActiveOrInactive;
}