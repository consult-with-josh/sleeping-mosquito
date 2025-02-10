import { IUser, KycApplicantType, KycDoc, ScxErrors } from '@scalex-api/sdk';
import { BusinessMock, IGetSmileJobStatusPayload, ISmileBusinessVerificationPayload, ISmileVerificationLinkPayload, IdDocument, SmileBusinessRegistrationType, SmileSupportedCountries } from './smile-id.interfaces';
import { signSmileRequest } from './smile-id.signature';
import { entityToIdTypeMapping, smileIdTypes } from './smile-id.constants';
import { ScalexLinks } from '../../../../interfaces';
import { SmileIdAuth } from './smile-id.repository';

export function constructVerificationPayload(
	entity: KycDoc,
	smileIdAuth: SmileIdAuth,
	scalexLinks: ScalexLinks,
	user: Partial<IUser>
): ISmileVerificationLinkPayload {
	const signature = signSmileRequest( smileIdAuth );
	const oneHour = new Date();
	oneHour.setHours( oneHour.getHours() + 1 );
	const doc = entityToIdTypeMapping[ entity ];
	if ( !doc ) throw ScxErrors.invalidDocumentType();
	return {
		partner_id: smileIdAuth.partnerId,
		signature: signature.signature,
		timestamp: signature.timestamp,
		name: `${ entity }-${ user.profile.firstName }-${ user.profile.lastName }`,
		company_name: 'Scalex',
		id_types: smileIdTypes.filter(
			( t ) => entityToIdTypeMapping[ entity ] === t.id_type
		),
		callback_url: smileIdAuth.webhook,
		data_privacy_policy_url: scalexLinks.privacyPolicy,
		logo_url: scalexLinks.logo,
		is_single_use: true,
		user_id: user._id.toString(),
		expires_at: oneHour
	};
}

export function constructJobStatusPayload(
	smileIdAuth: SmileIdAuth,
	userId: string,
	jobId: string
): IGetSmileJobStatusPayload {
	const signature = signSmileRequest( smileIdAuth );
	return {
		timestamp: signature.timestamp,
		signature: signature.signature,
		user_id: userId,
		job_id: jobId,
		partner_id: smileIdAuth.partnerId,
		image_links: true,
		history: false
	};
}

export function constructBusinessVerificationPayload(
	smileIdAuth: SmileIdAuth,
	business: BusinessMock,
	jobId: string,
): ISmileBusinessVerificationPayload {
	const signature = signSmileRequest( smileIdAuth );
	const oneHour = new Date();
	oneHour.setHours( oneHour.getHours() + 1 );
	
	return {
		partner_id: smileIdAuth.partnerId,
		signature: signature.signature,
		timestamp: signature.timestamp,
		source_sdk: 'rest_api',
		source_sdk_version: '1.0.0',
		country: SmileSupportedCountries.NG,
		company_name: 'Scalex',
		partner_params: {
			business: jobId
		},
		id_type: IdDocument.cac,
		id_number: business.registration.number,
		callback_url: smileIdAuth.webhook,
		business_type: SmileBusinessRegistrationType[business.registration.type],
		user_id: `${KycApplicantType.business}-${jobId}`,
	};
}