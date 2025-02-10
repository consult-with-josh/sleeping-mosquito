import { IBaseModel } from "@scalex-api/sdk";
import { CurrencyType } from "./currency.types";

export enum PercentageChangeTimeframes {
	_1h = '_1h',
	_1d = '_1d',
	_1w = '_1w',
}

export interface IPercentageChangeTimeframes {
	timeframe: PercentageChangeTimeframes,
	value: number
}

export interface IRate extends IBaseModel {
	currency: {
		id: string;
		type: CurrencyType
	}
	rate: number,
	percentageChange: Array<IPercentageChangeTimeframes>;
}
