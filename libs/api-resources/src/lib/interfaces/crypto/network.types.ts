import { IBaseModel } from "@scalex-api/sdk";
import { LpProviders } from "../lps";

export interface ICryptoNetwork extends IBaseModel {
	name: string,
	logo: string,
	symbol: string,
	isActive: boolean,
	alias: {
		[K in keyof typeof LpProviders]?: string;
	},
}

export interface ICryptoNetworkConfig {
	id: string;
	isActive: boolean
}

