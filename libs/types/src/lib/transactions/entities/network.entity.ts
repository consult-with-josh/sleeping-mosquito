import { z } from "zod";
import { ActiveOrInactive, zBaseModelSch } from "../../generic";
import { Types } from "mongoose";

export const zAlias = z.object( {
	provider: z.instanceof( Types.ObjectId ),
	name: z.string(),
} );

export const zNetwork = zBaseModelSch.extend( {
	name: z.string(),
	symbol: z.string(),
	icon: z.string().optional(),
	aliases: z.array( zAlias ).optional(),
	status: z.nativeEnum( ActiveOrInactive ),
} );

export type INetwork = z.infer<typeof zNetwork>;
export type IAlias = z.infer<typeof zAlias>;