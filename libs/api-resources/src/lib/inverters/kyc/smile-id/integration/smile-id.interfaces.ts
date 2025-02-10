export enum BusinessRegistrationType {
    businessName = "business-name",
    privateOrPublicLtd = "private-public-ltd",
    incorporatedTrustees = "incorporated-trustees"
}

export type BusinessMock = { registration: { number: string; type: string } }

export enum IdDocument {
	passport = 'PASSPORT',
	driversLicense = 'DRIVERS_LICENSE',
	voterId = 'VOTER_ID',
	ninSlip = 'NIN_SLIP',
	bvn = 'BVN',
	virtualNin = 'V_NIN',
	cac = 'BUSINESS_REGISTRATION',
}

export enum VerificationMethod {
	biometric = 'biometric_kyc',
	enhanced = 'enhanced_kyc',
	authentication = 'authentication',
	basic = 'basic_kyc',
	documentVerification = 'doc_verification'
}

export enum SmileSupportedBusinessTypes {
	bn = 'bn',
	co = 'co',
	it = 'it'
}


export type SmileBusinessType = {
	[key in BusinessRegistrationType]: SmileSupportedBusinessTypes;
}

export const SmileBusinessRegistrationType: SmileBusinessType = {
	'business-name': SmileSupportedBusinessTypes.bn,
	'incorporated-trustees': SmileSupportedBusinessTypes.it,
	'private-public-ltd': SmileSupportedBusinessTypes.co
};

export enum SmileSupportedCountries {
	NG = 'NG'
}

export interface SmileIdType {
	id_type: IdDocument;
	verification_method: VerificationMethod,
	country: SmileSupportedCountries;
}

export interface ISmileVerificationLinkPayload {
	partner_id: string;
	signature: string;
	timestamp: string;
	company_name: string;
	name: string;
	id_types: Array<SmileIdType>;
	callback_url: string;
	data_privacy_policy_url: string;
	logo_url: string;
	is_single_use: boolean;
	user_id: string;
	expires_at: Date;
}

export interface ISmileBusinessVerificationPayload {
	partner_id: string;
	source_sdk: 'rest_api';
	source_sdk_version: '1.0.0';
	country: SmileSupportedCountries;
	signature: string;
	timestamp: string;
	company_name: string;
	id_type: IdDocument;
	partner_params: unknown;
	id_number: string;
	callback_url: string;
	business_type: SmileSupportedBusinessTypes;
	user_id: string;
}

export interface ISmileVerificationLinkResponse {
	link: string;
	ref_id: string;
}

export interface IGetSmileJobStatusPayload {
	timestamp: string;
	signature: string;
	user_id: string;
	job_id: string;
	partner_id: string;
	image_links: boolean;
	history: boolean;
}

export interface IGetSmileJobStatusResponse {
	timestamp: string;
	signature: string;
	job_complete: boolean;
	job_success: boolean;
	result: {
		ResultText: string;
		ResultType: string;
		SmileJobID: string;
		JSONVersion: string;
		IsFinalResult: string;
		PartnerParams: {
			job_id: string;
			user_id: string;
			job_type: number;
			link_id: string;
			optional_info?: string;
			more_optional_info?: string;
		};
		ConfidenceValue?: string;
		IsMachineResult?: string;
	};
	image_links?: {
		selfie_image: string;
	};
	code: string;
}

interface ISmileBeneficialOwner {
	address: string;
	gender: string;
	name: string;
	nationality: string;
	phone_number: string;
	registration_number: string;
	shareholder_type: 'Corporate' | 'Individual';
	shareholding_breakdown: unknown[];
	shareholdings: string;
}

interface ISmileCompanyInformation {
	address: string;
	authorized_shared_capital: string;
	authorized_shared_capital_breakdown: unknown[];
	company_type: string;
	country: string;
	email: string;
	industry: string;
	legal_name: string;
	phone: string;
	registration_date: string;
	registration_number: string;
	search_number: string;
	state: string;
	status: string;
	tax_id: string;
}

export interface ISmileDirector {
	address: string;
	date_of_birth: string;
	gender: string;
	id_number: string;
	id_type: string;
	name: string;
	nationality: string;
	occupation: string;
	phone_number: string;
	shareholding_breakdown: unknown[];
	shareholdings: string;
}

interface ISmileFiduciary {
	address: string;
	fiduciary_type: string;
	name: string;
	registration_number: string;
}


export interface ISmileIdBusinessVerificationResponse {
	signature: string;
	timestamp: string;
	Actions: { [ key: string ]: string };
	IsFinalResult: string;
	PartnerParams: {
		business: string;
		job_id: string;
		job_type: number;
		user_id: string;
	};
	ResultCode: string;
	ResultText: string;
	ResultType: string;
	SmileJobID: string;
	beneficial_owners: ISmileBeneficialOwner[];
	company_information: ISmileCompanyInformation;
	directors: ISmileDirector[];
	documents: { search_certificate: string };
	fiduciaries: ISmileFiduciary[];
	proprietors: unknown[];
	success: boolean;
	message: string;
	kyb_receipt: string;
}
