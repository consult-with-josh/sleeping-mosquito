import { SchemaDefinition } from "mongoose";
import { IAlias, IAsset, ActiveOrInactive, CurrencyType } from "@scalex-africa/types";
import { RequiredObjectIdWithRef, RequiredObjectId, RequiredString, RequiredNumber, RequiredEnum, ScxCollection, createModel, RequiredStringWithDefault, createSchema } from "../../functions";

const AliasSchemaDef: SchemaDefinition<IAlias> = {
	provider: RequiredObjectId,
	name: RequiredString,
};

const AssetNetworkConfigSchemaDef = {
	id: RequiredObjectIdWithRef( ScxCollection.network ),
	status: RequiredStringWithDefault( ActiveOrInactive.active, { enum: ActiveOrInactive } )
};

const assetNetworkConfigSchema = createSchema( AssetNetworkConfigSchemaDef );

export const AssetSchemaDef: SchemaDefinition<IAsset> = {
	name: RequiredString,
	symbol: RequiredString,
	decimals: RequiredNumber,
	icon: String,
	type: RequiredEnum( CurrencyType ),
	minAmount: Number,
	networks: [assetNetworkConfigSchema],
	status: RequiredStringWithDefault( ActiveOrInactive.active, { enum: ActiveOrInactive } ),
	aliases: [ AliasSchemaDef ],
};

export const Asset = createModel<IAsset>( AssetSchemaDef, ScxCollection.asset );
