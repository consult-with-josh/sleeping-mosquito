import { HttpMethods, IUser, KycDoc } from '@scalex-api/sdk';
import {
	BusinessMock,
	IGetSmileJobStatusPayload,
	IGetSmileJobStatusResponse,
	ISmileBusinessVerificationPayload,
	ISmileIdBusinessVerificationResponse,
	ISmileVerificationLinkPayload,
	ISmileVerificationLinkResponse,
} from './smile-id.interfaces';
import {
	constructBusinessVerificationPayload,
	constructJobStatusPayload,
	constructVerificationPayload
} from './smile-id.helpers';
import { ScalexLinks } from '../../../../interfaces';
import { callApi } from '../../../../functions';

const SmileBaseUrl = 'https://api.smileidentity.com/v1';

export type SmileIdAuth = {
	partnerId: string;
	apiKey: string;
	server: string;
	webhook: string;
}

export async function createSmileVerificationLink(
	entity: KycDoc,
	smileIdAuth: SmileIdAuth,
	scalexLinks: ScalexLinks,
	user: Partial<IUser>
) {
	try {
		return callApi<ISmileVerificationLinkPayload, ISmileVerificationLinkResponse>( {
			serviceUri: SmileBaseUrl,
			endpoint: {
				path: '/smile_links',
				fullPath: '/smile_links',
				method: HttpMethods.Post
			},
			body: constructVerificationPayload(
				entity,
				smileIdAuth,
				scalexLinks,
				user
			)
		}, true );
	} catch ( e ) {
		console.log( e );
	}
}

export async function applyForSmileBusinessVerification(
	smileIdAuth: SmileIdAuth,
	business: BusinessMock,
	jobId: string
) {
	try {
		return callApi<ISmileBusinessVerificationPayload, ISmileIdBusinessVerificationResponse>( {
			serviceUri: SmileBaseUrl,
			endpoint: {
				path: '/business_verification',
				fullPath: '/business_verification',
				method: HttpMethods.Post
			},
			body: constructBusinessVerificationPayload(
				smileIdAuth,
				business,
				jobId
			)
		}, true );
	} catch ( e ) {
		console.log( e );
	}
}

export async function getSmileJobStatus(
	smileIdAuth: SmileIdAuth,
	userId: string,
	jobId: string
) {
	try {
		return callApi<IGetSmileJobStatusPayload, IGetSmileJobStatusResponse>( {
			serviceUri: SmileBaseUrl,
			endpoint: {
				path: '/job_status',
				fullPath: '/job_status',
				method: HttpMethods.Post
			},
			body: constructJobStatusPayload(
				smileIdAuth,
				userId,
				jobId
			)
		}, true );
	} catch ( e ) {
		console.log( e );
	}
}
