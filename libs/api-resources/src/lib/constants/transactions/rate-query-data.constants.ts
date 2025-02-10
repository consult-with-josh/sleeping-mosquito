import { GetRatesDto, RampType } from "@scalex-api/sdk";

export const RateQueryData: Array<GetRatesDto> = [
	{
		payInCurrencyCode: "NGN",
		payInCurrencyNetwork: "LOCAL",
		receiveInCurrencyCode: "USDT",
		receiveInCurrencyNetwork: "BEP20",
		orderType: RampType.BUY
	},
	{
		payInCurrencyCode: "USDT",
		payInCurrencyNetwork: "BEP20",
		receiveInCurrencyCode: "NGN",
		receiveInCurrencyNetwork: "LOCAL",
		orderType: RampType.SELL
	}
];
