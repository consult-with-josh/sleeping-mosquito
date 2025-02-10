import { z } from 'zod';
import { declareResource, HttpMethods, ScxEndpointSchema } from '../../generic';
import { RampBasePath, SellCryptoPath } from './ramp.config';

export const SellCryptoTags = ['Sell'];

const zSellQuoteRequest = {
	body: z.object( {
		amount: z.number(),
		sourceToken: z.string(),
		sourceNetwork: z.string(),
		destinationCurrency: z.string(),
		destinationType: z.string(),
	} ),
	response: z.object( {
		rate: z.number(),
		processingFee: z.number(),
		amountToReceive: z.number(),
		estimatedTime: z.string(),
		expiresAt: z.string(),
	} ),
	query: z.never(),
};

const zVerifyBankRequest = {
	body: z.object( {
		accountNumber: z.string(),
		bankCode: z.string(),
	} ),
	response: z.object( {
		accountName: z.string(),
		accountNumber: z.string(),
		bankName: z.string(),
		bankCode: z.string(),
		verified: z.boolean(),
	} ),
	query: z.never(),
};

const zSellOrderRequest = {
	body: z.object( {
		amount: z.number(),
		sourceToken: z.string(),
		sourceNetwork: z.string(),
		destinationCurrency: z.string(),
		destinationType: z.string(),
		rate: z.number(),
		processingFee: z.number(),
		bankDetails: z.object( {
			accountNumber: z.string(),
			accountName: z.string(),
			bankCode: z.string(),
			bankName: z.string(),
		} ),
	} ),
	response: z.object( {
		orderId: z.string(),
		paymentAddress: z.string(),
		amountToSend: z.number(),
		amountToReceive: z.number(),
		expiresAt: z.string(),
		status: z.string(),
	} ),
	query: z.never(),
};

export const SellQuoteResourceSchema: ScxEndpointSchema<
  z.infer<typeof zSellQuoteRequest.body>,
  z.infer<typeof zSellQuoteRequest.response>,
  z.infer<typeof zSellQuoteRequest.query>
> = zSellQuoteRequest;

export const VerifyBankResourceSchema: ScxEndpointSchema<
  z.infer<typeof zVerifyBankRequest.body>,
  z.infer<typeof zVerifyBankRequest.response>,
  z.infer<typeof zVerifyBankRequest.query>
> = zVerifyBankRequest;

export const SellOrderResourceSchema: ScxEndpointSchema<
  z.infer<typeof zSellOrderRequest.body>,
  z.infer<typeof zSellOrderRequest.response>,
  z.infer<typeof zSellOrderRequest.query>
> = zSellOrderRequest;

export const SellQuoteResource = declareResource<
  z.infer<typeof zSellQuoteRequest.body>,
  z.infer<typeof zSellQuoteRequest.response>,
  z.infer<typeof zSellQuoteRequest.query>
>( {
	schema: SellQuoteResourceSchema,
	method: HttpMethods.Post,
	path: '/quote',
	fullPath: `${RampBasePath}${SellCryptoPath}/quote`,
	tags: SellCryptoTags,
	name: 'Get Sell Quote',
	resourceName: 'SellQuoteResource',
	desc: 'Get quote for selling crypto',
} );

export const VerifyBankResource = declareResource<
  z.infer<typeof zVerifyBankRequest.body>,
  z.infer<typeof zVerifyBankRequest.response>,
  z.infer<typeof zVerifyBankRequest.query>
>( {
	schema: VerifyBankResourceSchema,
	method: HttpMethods.Post,
	path: '/verify-bank',
	fullPath: `${RampBasePath}${SellCryptoPath}/verify-bank`,
	tags: SellCryptoTags,
	name: 'Verify Bank Account',
	resourceName: 'VerifyBankResource',
	desc: 'Verify bank account details',
} );

export const SellOrderResource = declareResource<
  z.infer<typeof zSellOrderRequest.body>,
  z.infer<typeof zSellOrderRequest.response>,
  z.infer<typeof zSellOrderRequest.query>
>( {
	schema: SellOrderResourceSchema,
	method: HttpMethods.Post,
	path: '/order',
	fullPath: `${RampBasePath}${SellCryptoPath}/order`,
	tags: SellCryptoTags,
	name: 'Create Sell Order',
	resourceName: 'SellOrderResource',
	desc: 'Create a new sell order',
} );
