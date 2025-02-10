import { z } from "zod";
import { ActiveOrInactive, zBaseModelSch } from "../../generic";
import { Types } from "mongoose";
import { zAlias } from "./network.entity";
import { CountryCodes } from "./country-codes.enum";

export enum CurrencyType {
	crypto = 'crypto',
	fiat = 'fiat',
}

export const zAssetNetworkConfig = z.object( {
	id: z.instanceof( Types.ObjectId ),
	status: z.nativeEnum( ActiveOrInactive ),
} );

export const zAsset = zBaseModelSch.extend( {
	name: z.string(),
	symbol: z.string(),
	decimals: z.number(),
	icon: z.string().optional(),
	type: z.nativeEnum( CurrencyType ),
	minAmount: z.number().optional(),
	networks: z.array( zAssetNetworkConfig ).optional(),
	status: z.nativeEnum( ActiveOrInactive ),
	aliases: z.array( zAlias ).optional(),
	baseCountries: z.array( z.nativeEnum( CountryCodes ) ).optional(),
} );

export type IAsset = z.infer<typeof zAsset>;
export type IAssetNetworkConfig = z.infer<typeof zAssetNetworkConfig>;
