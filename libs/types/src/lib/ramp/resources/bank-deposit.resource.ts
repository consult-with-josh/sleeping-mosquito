import { z } from 'zod';
import { declareResource, HttpMethods, ScxEndpointSchema } from '../../generic';
import { BankPaymentPath, RampBasePath } from './ramp.config';

export const BankPaymentTags = ['Bank'];

const zBankPaymentRequest = {
	body: z.object( {
		amount: z.number(),
		sourceCurrency: z.string(),
		destinationCurrency: z.string(),
		rate: z.number(),
		processingFee: z.number(),
		receivingAddress: z.string(),
	} ),
	response: z.object( {
		bankName: z.string(),
		accountName: z.string(),
		accountNumber: z.string(),
		expiresAt: z.string(),
		amountToPay: z.number(),
	} ),
	query: z.never(),
};

export const BankPaymentResourceSchema: ScxEndpointSchema<
  z.infer<typeof zBankPaymentRequest.body>,
  z.infer<typeof zBankPaymentRequest.response>,
  z.infer<typeof zBankPaymentRequest.query>
> = zBankPaymentRequest;

export const BankPaymentResource = declareResource<
  z.infer<typeof zBankPaymentRequest.body>,
  z.infer<typeof zBankPaymentRequest.response>,
  z.infer<typeof zBankPaymentRequest.query>
>( {
	schema: BankPaymentResourceSchema,
	method: HttpMethods.Post,
	path: '/account-generate',
	fullPath: `${RampBasePath}${BankPaymentPath}/account-generate`,
	tags: BankPaymentTags,
	name: 'Bank Payment Details',
	resourceName: 'BankPaymentResource',
	desc: 'Get bank payment details for fiat transactions',
} );
