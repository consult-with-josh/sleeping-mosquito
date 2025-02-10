import { z } from "zod";
import { zBaseModelSch, zIntegrationStatusSch, zYesOrNo } from "../../generic";
import { Types } from "mongoose";

export const zRampConfig = z.object( {
	showPastTx: zYesOrNo,
	showRecentTxSuggestions: zYesOrNo,
	showPastDestinations: zYesOrNo,
	amountSuggestion: z.object( {
		show: zYesOrNo,
		customAmounts: z.array( z.number() ).optional(),
	} ),
	persistUserSession: zYesOrNo,
	showFeeBreakdown: zYesOrNo,
} );

export type IRampConfig = z.infer<typeof zRampConfig>;

export const zAppConfig = z.object( {
	ramp: zRampConfig,
} );

export type IAppConfig = z.infer<typeof zAppConfig>;

export const zApp = zBaseModelSch.extend( {
	business: z.instanceof( Types.ObjectId ),
	name: z.string(),
	slug: z.string(),
	accountId: z.string(),
	status: zIntegrationStatusSch,
	description: z.string().optional(),
	logo: z.string().optional(),
	config: zAppConfig
} );

export type IApp = z.infer<typeof zApp>;