import { IApp, YesOrNo, IntegrationStatus } from "@scalex-africa/types";
import { createModel, RequiredObjectIdWithRef, RequiredString, RequiredStringWithDefault, ScxCollection } from "../functions";
import { SchemaDefinition } from "mongoose";

const appSchemaDef: SchemaDefinition<IApp> = {
	business: RequiredObjectIdWithRef( ScxCollection.business ),
	name: RequiredString,
	slug: RequiredString,
	description: String,
	accountId: RequiredString,
	status: RequiredStringWithDefault( IntegrationStatus.active, { enum: IntegrationStatus } ),
	logo: String,
	config: {
		ramp: {
			showPastDestinations: RequiredStringWithDefault( YesOrNo.yes, { enum: YesOrNo } ),
			showRecentTxSuggestions: RequiredStringWithDefault( YesOrNo.yes, { enum: YesOrNo } ),
			showPastTx: RequiredStringWithDefault( YesOrNo.yes, { enum: YesOrNo } ),
			persistUserSession: RequiredStringWithDefault( YesOrNo.yes, { enum: YesOrNo } ),
			showFeeBreakdown: RequiredStringWithDefault( YesOrNo.yes, { enum: YesOrNo } ),
			amountSuggestion: {
				show: RequiredStringWithDefault( YesOrNo.yes, { enum: YesOrNo } ),
				customAmounts: [Number],
			},
		}
	}
};

export const App = createModel<IApp>( appSchemaDef, ScxCollection.app );