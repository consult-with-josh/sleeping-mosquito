import { SchemaDefinition } from "mongoose";
import { ICryptoNetwork } from "../../../../interfaces";
import { RequiredString, ScxCollection } from "../../../../constants";
import { createModel } from "../../../../functions";


export const CryptoNetworkSchemaDef: SchemaDefinition<ICryptoNetwork> = {
	name: RequiredString,
	symbol: RequiredString,
	logo: RequiredString,
	isActive: Boolean,
	alias: Object,
};

export const CryptoNetwork = createModel<ICryptoNetwork>( CryptoNetworkSchemaDef, ScxCollection.cryptoNetwork );
