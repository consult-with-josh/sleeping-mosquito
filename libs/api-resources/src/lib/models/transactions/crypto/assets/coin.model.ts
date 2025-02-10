import { SchemaDefinition } from "mongoose";
import { CurrencyType, ICryptoCoin, ICryptoNetworkConfig } from "../../../../interfaces";
import { RequiredEnum, RequiredSchema, RequiredString, ScxCollection } from "../../../../constants";
import { createModel } from "../../../../functions";

const NetworkSchemaDef: SchemaDefinition<ICryptoNetworkConfig> = {
	id: RequiredString,
	isActive: Boolean
};

export const CryptoCoinSchemaDef: SchemaDefinition<ICryptoCoin> = {
	symbol: RequiredString,
	fullName: String,
	logo: RequiredString,
	isActive: Boolean,
	type: RequiredEnum( CurrencyType ),
	rates: [ RequiredString ],
	networks: RequiredSchema( NetworkSchemaDef ),
	alias: Object,
};

export const CryptoCoin = createModel<ICryptoCoin>( CryptoCoinSchemaDef, ScxCollection.cryptoCoin );
