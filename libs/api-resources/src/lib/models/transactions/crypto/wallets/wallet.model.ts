import { SchemaDefinition } from "mongoose";
import { ICryptoWallet, IWalletAddress, IWalletConfig } from "../../../../interfaces";
import { RequiredEnum, RequiredSchema, RequiredString, ScxCollection } from "../../../../constants";
import { createModel } from "../../../../functions";
import { ActiveOrInactive } from "@scalex-api/sdk";

const WalletAddressSchemaDef: SchemaDefinition<IWalletAddress> = {
	address: RequiredString,
	path: String,
	password: String,
	addressType: String,
	provider: RequiredString,
	isActive: Boolean
};

const WalletConfigSchemaDef: SchemaDefinition<IWalletConfig> = {
	network: RequiredString,
	addresses: RequiredSchema( WalletAddressSchemaDef ),
	ledgerBalance: Number,
	lockedBalance: Number,
	status: RequiredEnum( ActiveOrInactive )
};


export const CryptoWalletSchemaDef: SchemaDefinition<ICryptoWallet> = {
	customer: RequiredString,
	cryptoCoin: RequiredString,
	wallets: RequiredSchema( WalletConfigSchemaDef )
};

export const CryptoWallet = createModel<ICryptoWallet>( CryptoWalletSchemaDef, ScxCollection.cryptoWallet );
