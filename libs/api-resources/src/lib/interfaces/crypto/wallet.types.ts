import { ActiveOrInactive } from "@scalex-api/sdk";

export interface IWalletAddress {
	address: string,
	path?: string,
	password?: string,
	addressType?: string,
	provider: string
	isActive: boolean,
}

export interface IWalletConfig {
	network: string ,
	addresses: IWalletAddress,
	ledgerBalance: number,
	lockedBalance: number,
	status: ActiveOrInactive,
}

export interface ICryptoWallet {
	customer: string,
	cryptoCoin: string,
	wallets: Array<IWalletConfig>
}
