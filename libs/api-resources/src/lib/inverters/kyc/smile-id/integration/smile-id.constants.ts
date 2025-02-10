import { IdDocument, SmileIdType, SmileSupportedCountries, VerificationMethod } from './smile-id.interfaces';
import { KycDoc } from '@scalex-api/sdk';

export const entityToIdTypeMapping: {
	[key in KycDoc]: IdDocument
} = {
	[KycDoc.bvn]: IdDocument.bvn,
	[KycDoc.votersCard]: IdDocument.voterId,
	[KycDoc.internationalPassport]: IdDocument.passport,
	[KycDoc.nin]: IdDocument.virtualNin,
	[KycDoc.driversLicense]: IdDocument.driversLicense,
	[KycDoc.nationalId]: IdDocument.ninSlip,
	[KycDoc.utilityBill]: null,
	[KycDoc.bankStatement]: null,
	[KycDoc.phoneNumber]: null,
	[KycDoc.cac]: IdDocument.cac
};
export const smileIdTypes: Array<SmileIdType> = [
	{
		id_type: IdDocument.passport,
		verification_method: VerificationMethod.documentVerification,
		country: SmileSupportedCountries.NG
	},
	{
		id_type: IdDocument.driversLicense,
		verification_method: VerificationMethod.biometric,
		country: SmileSupportedCountries.NG
	},
	{
		id_type: IdDocument.voterId,
		verification_method: VerificationMethod.biometric,
		country: SmileSupportedCountries.NG
	},
	{
		id_type: IdDocument.ninSlip,
		verification_method: VerificationMethod.biometric,
		country: SmileSupportedCountries.NG
	},
	{
		id_type: IdDocument.virtualNin,
		verification_method: VerificationMethod.biometric,
		country: SmileSupportedCountries.NG
	},
	{
		id_type: IdDocument.bvn,
		verification_method: VerificationMethod.biometric,
		country: SmileSupportedCountries.NG
	},
	{
		id_type: IdDocument.cac,
		verification_method: VerificationMethod.documentVerification,
		country: SmileSupportedCountries.NG
	}
];