import { IRamp, IRampAmount, IRampDealDetail, RampState, RampStatus } from "@scalex-africa/types";
import { createModel, ObjectIdWithRef, RequiredObjectIdWithRef, RequiredString, RequiredStringWithDefault, ScxCollection } from "../functions";
import { SchemaDefinition } from "mongoose";

const rampAmountSchemaDef: SchemaDefinition<IRampAmount> = {
	initiated: Number,
	toBeCompleted: Number,
	completed: Number,
};

const rampDealDetailSchemaDef: SchemaDefinition<IRampDealDetail> = {
	asset: String,
	network: String,
	amount: rampAmountSchemaDef,
};

const rampSchemaDef: SchemaDefinition<IRamp> = {
	session: String,
	ref: RequiredString,
	status: RequiredStringWithDefault( RampStatus.initiated, { enum: RampStatus } ),
	state: RequiredStringWithDefault( RampState.initiated, { enum: RampState } ),
	buy: { ...rampDealDetailSchemaDef, destination: String },
	payWith: { ...rampDealDetailSchemaDef, source: String },
	app: RequiredObjectIdWithRef( ScxCollection.app ),
	deal: ObjectIdWithRef( ScxCollection.deal ),
	business: ObjectIdWithRef( ScxCollection.business ),
};

export const Ramp = createModel( rampSchemaDef, ScxCollection.ramp );
