import { GetRatesDto, GetRatesEndpoints, GetRatesRes, RampType } from "@scalex-api/sdk";
import { callApi } from "../api-factory.function";
import { RateQueryData } from "../../constants";

export const scalexTx = {
	getRates( serviceUri: string, payload: GetRatesDto ) {
		return callApi<unknown, GetRatesRes>( {
			serviceUri,
			body: payload,
			endpoint: GetRatesEndpoints.GetRatesResource
		} );
	},
	async getAllAssetsRates( serviceUri: string ) {
		const onramp = await getRateByRampType( serviceUri, RateQueryData, RampType.BUY );
		const offramp = await getRateByRampType( serviceUri, RateQueryData, RampType.SELL );
		return {
			onramp,
			offramp
		};
	}
};

async function getRateByRampType( serviceUri: string , payload: Array<GetRatesDto>, rampType: RampType ){
	const rates: { coin: string; rate: number; }[] = [];
	for ( const rateConfig of payload.filter( c => c.orderType === rampType ) ){
		try {
			const rate = await callApi<unknown, GetRatesRes>( {
				serviceUri,
				body: rateConfig,
				endpoint: GetRatesEndpoints.GetRatesResource
			} );

			console.log( { rate } );
			rates.push( {
				coin: rate.data.coin,
				rate: rate.data.exchangeRate
			} );
		} catch ( error ) {
			console.log( 'error fetching rate',error );
		}
	}

	return rates;
}
