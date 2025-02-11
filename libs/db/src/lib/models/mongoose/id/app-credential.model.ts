import { ScxCollection, createModel, RequiredString, RequiredObjectIdWithRef, RequiredStringWithDefault } from "../functions";
import { SchemaDefinition } from "mongoose";
import { AppCredType, IAppCredential } from "@scalex-africa/types";

const appCredentialSchemaDef: SchemaDefinition<IAppCredential> = {
	app: RequiredObjectIdWithRef( ScxCollection.app ),
	business: RequiredObjectIdWithRef( ScxCollection.business ),
	credentials: [ {
		type: RequiredStringWithDefault( AppCredType.secretKey, { enum: AppCredType } ),
		name: RequiredString,
		firstFour: String,
		claims: [ String ],
		value: RequiredString,
	} ],
};

export const AppCredential = createModel<IAppCredential>( appCredentialSchemaDef, ScxCollection.appCredential );