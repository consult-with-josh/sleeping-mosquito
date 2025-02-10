import { z } from 'zod';
import {
	declareResource,
	HttpMethods,
	ScxEndpointSchema,
} from '../../generic';
import { CurrencyType } from '../../transactions';

const zAsset = z.object( {
	asset: z.string(),
	network: z.string().optional(),
	currencyType: z.enum( Object.values( CurrencyType ) as [string, ...string[]] )
} );

const zDryRunPayload = z.object( {
	buyAsset: zAsset,
	payWithAsset: zAsset,
	amount: z.object( {
		type: z.enum( ['buy', 'pay-with'] ),
		value: z.number()
	} ),
	dealId: z.string(),
} );

const zDryRunResponse = z.object( {
	rate: z.number(),
	processingFee: z.number(),
	message: z.string(),
} );

const zDryRunTransactionRequest = {
	body: zDryRunPayload,
	response: zDryRunResponse,
	query: z.never()
};

export const DryRunTransactionResourceSchema: ScxEndpointSchema<
  z.infer<typeof zDryRunTransactionRequest.body>,
  z.infer<typeof zDryRunTransactionRequest.response>,
  z.infer<typeof zDryRunTransactionRequest.query>
> = zDryRunTransactionRequest;

export const DryRunTransactionResource = declareResource<
  z.infer<typeof zDryRunTransactionRequest.body>,
  z.infer<typeof zDryRunTransactionRequest.response>,
  z.infer<typeof zDryRunTransactionRequest.query>
>( {
	schema: DryRunTransactionResourceSchema,
	method: HttpMethods.Post,
	path: '/dry-run',
	fullPath: '/api/dry-run', // Adjust as necessary
	tags: ['Transaction'],
	name: 'Dry Run Transaction',
	resourceName: 'DryRunResource',
	desc: 'Get a transaction rate and processing fee',
} );
