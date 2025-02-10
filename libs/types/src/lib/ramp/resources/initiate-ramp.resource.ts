import { z } from 'zod';
import { declareResource, HttpMethods, ScxEndpointSchema } from '../../generic';
import { RampBasePath, RampTransactionsBasePath, RampTransactionTags } from './ramp.config';

export const zTransactionRequestAsset = z.object( {
	asset: z.string(),
	network: z.string().optional(),
} );

export enum InitTxAmountType {
	buy = 'buy',
	payWith = 'pay-with',
}

const zInitiateRampRequest = {
	body: z.object( {
		buyAsset: zTransactionRequestAsset,
		payWithAsset: zTransactionRequestAsset,
		amount: z.object( {
			type: z.nativeEnum( InitTxAmountType ),
			value: z.number()
		} ).strict().required(),
		deal: z.string(),
		walletAddress: z.string().optional(),
	} ),
	response: z.object( { } ),
	query: z.never(),
	headers: z.object( {
		sessionId: z.string(),
		publishableKey: z.string(),
		secretKey: z.string(),
	} ),
};

export type InitiateRampHeaders = z.infer<
  typeof zInitiateRampRequest.headers
>;

export const InitiateRampResourceSchema: ScxEndpointSchema<
  z.infer<typeof zInitiateRampRequest.body>,
  z.infer<typeof zInitiateRampRequest.response>,
  z.infer<typeof zInitiateRampRequest.query>,
  z.infer<typeof zInitiateRampRequest.headers>
> = zInitiateRampRequest;

export const InitiateRampResource = declareResource<
  z.infer<typeof zInitiateRampRequest.body>,
  z.infer<typeof zInitiateRampRequest.response>,
  z.infer<typeof zInitiateRampRequest.query>,
  z.infer<typeof zInitiateRampRequest.headers>
>( {
	schema: InitiateRampResourceSchema,
	method: HttpMethods.Post,
	path: '/',
	fullPath: `${RampBasePath}${RampTransactionsBasePath}`,
	tags: RampTransactionTags,
	name: 'Initiate Ramp',
	resourceName: 'InitiateRampResource',
	desc: 'Initialize a new ramp',
} );

export type ITransactionRequestAsset = z.infer<typeof zTransactionRequestAsset>;
