import { IBaseModel } from "@scalex-api/sdk";
import { CurrencyType } from "../currency.types";
import { LpProviders } from "../lps";
import { ICryptoNetworkConfig } from "./network.types";

export interface ICryptoCoin extends IBaseModel{
	symbol: string,
	fullName?: string,
	logo: string,
	isActive?: boolean,
	type: CurrencyType,
	alias: {
		[K in keyof typeof LpProviders]?: string;
	},
	rates?: Array<string>,
	networks: Array<ICryptoNetworkConfig>
}
