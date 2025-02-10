import { z } from "zod";
import { zBaseModelSch } from "../../generic";

export enum RampTxType {
	onramp = 'onramp',
	offramp = 'offramp',
}

export const zAssetWithDefault = z.object( {
	asset: z.string(),
	networks: z.array( z.string() ),
	isDefault: z.boolean().optional(),
} );

const zAssets = z.object( {
	payWith: z.array( zAssetWithDefault ),
	buy: z.array( zAssetWithDefault ),
} );

export const zStyle = z.object( {
	primaryColor: z.string().min( 3 )
} );

export const zDeal = zBaseModelSch.extend( {
	app: z.string(),
	business: z.string(),
	name: z.string(),
	type: z.nativeEnum( RampTxType ),
	style: zStyle,
	isDefault: z.boolean(),
	assets: zAssets
} );

export type IDeal = z.infer<typeof zDeal>;
export type IAssetWithDefault = z.infer<typeof zAssetWithDefault>;