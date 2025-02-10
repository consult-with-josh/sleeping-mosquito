import { SchemaDefinition } from "mongoose";
import { CurrencyType, IPercentageChangeTimeframes, IRate, PercentageChangeTimeframes } from "../../interfaces";
import { RequiredEnum, RequiredString } from "../../constants";

export const PercentageChangeSchemaDef: SchemaDefinition<IPercentageChangeTimeframes> = {
	timeframe: RequiredEnum( PercentageChangeTimeframes ),
	value: Number
};


export const RateSchemaDef: SchemaDefinition<IRate> = {
	currency: {
		id: RequiredString,
		type: RequiredEnum( CurrencyType )
	},
	rate: Number,
	percentageChange: [ PercentageChangeSchemaDef ]
};
