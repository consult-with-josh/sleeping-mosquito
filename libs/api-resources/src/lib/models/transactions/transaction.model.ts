import { SchemaDefinition } from "mongoose";
import { ITransaction, ITransactionParticipant, ResourceOwner, TransactionStatus, TransactionType } from "../../interfaces";
import { createModel } from "../../functions";
import { RequiredEnum, RequiredString, ScxCollection, RequiredObjectIdWithRef, ObjectIdWithRef } from "../../constants";
import { BankAccountSchemaDef } from "./fiat/bank.model";
import { ServiceProviders } from "../../enums";

export const TransactionRecipientSchemaDef: SchemaDefinition<ITransactionParticipant> = {
	type: RequiredEnum( ResourceOwner ),
	id: RequiredString,
	isInternal: Boolean,
	address: RequiredString,
	addressPassword: RequiredString,
	bankAccount: BankAccountSchemaDef
};

export const TransactionSchemaDef: SchemaDefinition<ITransaction> = {
	reference: RequiredString,
	dealId: RequiredString,
	status: RequiredEnum( TransactionStatus ),
	type: RequiredEnum( TransactionType ),
	buyAsset: {
		asset: RequiredObjectIdWithRef( ScxCollection.asset ),
		network: ObjectIdWithRef( ScxCollection.network ),
		amount: Number,
	},
	payWithAsset: {
		asset: RequiredObjectIdWithRef( ScxCollection.asset ),
		network: ObjectIdWithRef( ScxCollection.network ),
		amount: Number,
	},
	walletAddress: String,
	fee: {
		amount: Number,
		currency: RequiredString,
	},
	rate: {
		value: Number,
		base: RequiredString,
		quote: RequiredString,
	},
	meta: {
		provider: RequiredEnum( ServiceProviders ),
		providerReference: String,
		initiatedAt: Date,
		completedAt: Date,
	}
};

export const Transaction = createModel<ITransaction>( TransactionSchemaDef, ScxCollection.transaction );
