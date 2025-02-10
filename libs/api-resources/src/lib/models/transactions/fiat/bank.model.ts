import { SchemaDefinition } from "mongoose";
import { IBankAccount, ResourceOwner } from "../../../interfaces";
import { RequiredEnum, RequiredString } from "../../../constants";
import { ActiveOrInactive } from "@scalex-api/sdk";


export const BankAccountSchemaDef: SchemaDefinition<IBankAccount> = {
	owner: {
		type: RequiredEnum( ResourceOwner ),
		id: RequiredString
	},
	nuban: RequiredString,
	bank: RequiredString,
	currency: RequiredString,
	status: RequiredEnum( ActiveOrInactive ),
	meta: {
		accountName: RequiredString
	}
};
