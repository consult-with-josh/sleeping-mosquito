import { ActiveOrInactive, IAccountTxLimits, IKycStage, KycDoc } from "@scalex-api/sdk";
import { SchemaDefinition } from "mongoose";
import { RequiredString, RequiredEnum, RequiredStringWithDefault, OptionalSchema, ScxCollection } from "../../constants";
import { createModel } from "../../functions";

const accountTxLimitSchemaDef: SchemaDefinition<IAccountTxLimits> = {
	singleTransactionLimit: Number,
	walletBalanceLimit: Number,
	monthlyMax: Number,
	dailyMax: Number,
	weeklyMax: Number,
	quarterlyMax: Number,
	yearlyMax: Number,
};

export const kycStageSchemaDef: SchemaDefinition<IKycStage> = {
	name: RequiredString,
	description: String,
	acceptedDocs: [RequiredEnum( KycDoc )],
	individualUSDLimit: OptionalSchema( accountTxLimitSchemaDef ),
	businessUSDLimit: OptionalSchema( accountTxLimitSchemaDef ),
	status: RequiredStringWithDefault( ActiveOrInactive.active, { enum: ActiveOrInactive } ),
};

export const KycStage = createModel<IKycStage>( kycStageSchemaDef, ScxCollection.kycStage );