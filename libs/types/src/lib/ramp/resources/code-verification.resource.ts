import { z } from 'zod';
import { declareResource, HttpMethods, ScxEndpointSchema } from '../../generic';
import { RampBasePath, VerificationPath } from './ramp.config';

export const VerificationTags = ['Verification'];

// Email Generation Request
const zEmailGenerateRequest = {
	body: z.object( {
		email: z.string().email(),
		walletAddress: z.string(),
	} ),
	response: z.object( {
		success: z.boolean(),
		message: z.string(),
	} ),
	query: z.never(),
};

// Phone Generation Request
const zPhoneGenerateRequest = {
	body: z.object( {
		phoneNumber: z.string(),
		firstName: z.string(),
		middleName: z.string().optional(),
		lastName: z.string(),
		walletAddress: z.string(),
	} ),
	response: z.object( {
		success: z.boolean(),
		message: z.string(),
	} ),
	query: z.never(),
};

// Verification Request
const zVerifyRequest = {
	body: z.object( {
		type: z.enum( ['email', 'phone'] ),
		code: z.string(),
		identifier: z.string(), // email or phone number
		walletAddress: z.string(),
	} ),
	response: z.object( {
		success: z.boolean(),
		message: z.string(),
		verified: z.boolean(),
	} ),
	query: z.never(),
};

export const VerifyResourceSchema: ScxEndpointSchema<
  z.infer<typeof zVerifyRequest.body>,
  z.infer<typeof zVerifyRequest.response>,
  z.infer<typeof zVerifyRequest.query>
> = zVerifyRequest;

export const EmailGenerateResource = declareResource<
  z.infer<typeof zEmailGenerateRequest.body>,
  z.infer<typeof zEmailGenerateRequest.response>,
  z.infer<typeof zEmailGenerateRequest.query>
>( {
	schema: zEmailGenerateRequest,
	method: HttpMethods.Post,
	path: '/email/generate',
	fullPath: `${RampBasePath}${VerificationPath}/email/generate`,
	tags: VerificationTags,
	name: 'Generate Email Verification',
	resourceName: 'EmailGenerateResource',
	desc: 'Generate and send verification code to email',
} );

export const PhoneGenerateResourceSchema: ScxEndpointSchema<
  z.infer<typeof zPhoneGenerateRequest.body>,
  z.infer<typeof zPhoneGenerateRequest.response>,
  z.infer<typeof zPhoneGenerateRequest.query>
> = zPhoneGenerateRequest;

export const PhoneGenerateResource = declareResource<
  z.infer<typeof zPhoneGenerateRequest.body>,
  z.infer<typeof zPhoneGenerateRequest.response>,
  z.infer<typeof zPhoneGenerateRequest.query>
>( {
	schema: PhoneGenerateResourceSchema,
	method: HttpMethods.Post,
	path: '/phone/generate',
	fullPath: `${RampBasePath}${VerificationPath}/phone/generate`,
	tags: VerificationTags,
	name: 'Generate Phone Verification',
	resourceName: 'PhoneGenerateResource',
	desc: 'Generate and send verification code to phone',
} );

export const VerifyCodeResource = declareResource( {
	schema: zVerifyRequest,
	method: HttpMethods.Post,
	path: '/verify',
	fullPath: `${RampBasePath}${VerificationPath}/verify`,
	tags: VerificationTags,
	name: 'Verify Code',
	resourceName: 'VerifyCodeResource',
	desc: 'Verify code for email or phone',
} );
