import { SchemaDefinition } from "mongoose";
import { IDeal, RampTxType } from "@scalex-africa/types";
import {
	ObjectIdWithRef,
	RequiredBooleanWithDefault,
	RequiredObjectIdWithRef,
	RequiredString,
	RequiredStringWithDefault,
	ScxCollection,
	createModel
} from "../functions";

const dealAssetSchemaDef: SchemaDefinition<IDeal['assets']> = {
	buy: [
		{
			asset: RequiredObjectIdWithRef( ScxCollection.asset ),
			isDefault: Boolean,
			networks: [ ObjectIdWithRef( ScxCollection.network ) ],
		}
	],
	payWith: [
		{
			asset: RequiredObjectIdWithRef( ScxCollection.asset ),
			isDefault: Boolean,
			networks: [ ObjectIdWithRef( ScxCollection.network ) ],
		}
	]
};

const dealSchemaDef: SchemaDefinition<IDeal> = {
	app: RequiredObjectIdWithRef( ScxCollection.app ),
	business: RequiredObjectIdWithRef( ScxCollection.business ),
	name: RequiredString,
	type: RequiredStringWithDefault( RampTxType.onramp, { enum: RampTxType } ),
	style: {
		primaryColor: RequiredString
	},
	isDefault: RequiredBooleanWithDefault( false ),
	assets: dealAssetSchemaDef
};

export const Deal = createModel<IDeal>( dealSchemaDef, ScxCollection.deal );