import { Types } from "mongoose";
import { ActiveOrInactive, IBaseModel } from "../../generic";

export enum KycApplicationStatus {
	pending = "pending",
	approved = "approved",
	rejected = "rejected",
	requiresMoreInfo = "requires-more-info",
	requiresManualReview = "requires-manual-review"
}

export enum KycProvider {
	smileIdentity = "smile-identity",
}

export enum KycApplicantType {
    individual = "individual",
    business = "business",
    director = "director"
}

export enum KycDoc {
	phoneNumber = 'phone-number',
	bvn = 'bvn',
	nin = 'nin',
	driversLicense = 'drivers-license',
	votersCard = 'voters-card',
	internationalPassport = 'international-passport',
	nationalId = 'national-id',
	utilityBill = 'utility-bill',
	bankStatement = 'bank-statement',
	cac = 'cac'
}

export type IAccountTxLimits = {
	singleTransactionLimit?: number;
	walletBalanceLimit?: number;
	monthlyMax?: number;
	dailyMax?: number;
	weeklyMax?: number;
	quarterlyMax?: number;
	yearlyMax?: number;
}

export interface IKycStage extends IBaseModel {
	name: string;
	description?: string;
	acceptedDocs: Array<KycDoc>;
	individualUSDLimit?: IAccountTxLimits;
	businessUSDLimit?: IAccountTxLimits;
	status: ActiveOrInactive;
}

export interface IKycApplication<UserData = unknown, ProviderData = unknown> extends IBaseModel {
	stage: Types.ObjectId;
	applicantType: KycApplicantType;
	doc: KycDoc;
	status: KycApplicationStatus;
	user: Types.ObjectId;
	provider: KycProvider;
	job?: Types.ObjectId;
	userProvidedData: UserData;
	providerData: ProviderData;
}
