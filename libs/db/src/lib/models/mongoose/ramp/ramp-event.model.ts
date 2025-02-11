import { RampEventSource, RampState, IRampEvent } from "@scalex-africa/types";
import { SchemaDefinition } from "mongoose";
import { RequiredObjectIdWithRef, RequiredString, RequiredStringWithDefault, ScxCollection, createModel } from "../functions";

const rampEventSchemaDef: SchemaDefinition<IRampEvent> = {
	ramp: RequiredObjectIdWithRef( ScxCollection.ramp ),
	logs: [
		{
			action: RequiredString,
			description: RequiredString,
			state: RequiredStringWithDefault( RampState.initiated, { enum: RampState } ),
			source: RequiredStringWithDefault( RampEventSource.system, { enum: RampEventSource } ),
		}
	],
};

export const RampEvent = createModel( rampEventSchemaDef, ScxCollection.rampEvent );
