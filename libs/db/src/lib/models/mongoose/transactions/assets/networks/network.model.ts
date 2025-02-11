import { SchemaDefinition } from "mongoose";
import { IAlias, INetwork, ActiveOrInactive } from "@scalex-africa/types";
import { RequiredObjectId, RequiredString, RequiredStringWithDefault, ScxCollection, createModel } from "../../../functions";

const AliasSchemaDef: SchemaDefinition<IAlias> = {
	provider: RequiredObjectId,
	name: RequiredString,
};

export const NetworkSchemaDef: SchemaDefinition<INetwork> = {
	name: RequiredString,
	symbol: RequiredString,
	icon: String,
	aliases: [ AliasSchemaDef ],
	status: RequiredStringWithDefault( ActiveOrInactive.active, { enum: ActiveOrInactive } )
};

export const Network = createModel<INetwork>( NetworkSchemaDef, ScxCollection.network ); 