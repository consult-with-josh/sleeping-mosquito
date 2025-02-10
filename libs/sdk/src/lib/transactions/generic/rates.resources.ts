import { IsEnum, IsNotEmpty } from "class-validator";
import { TxUtilPath } from "./paths.config";
import { ScxEndpoint, HttpMethods, ScxEndpoints } from "../../generic";
import { RampType } from "../enums-utils";

export class GetRatesDto {
	@IsNotEmpty()
		payInCurrencyCode!: string;

	@IsNotEmpty()
		payInCurrencyNetwork!: string;

	@IsNotEmpty()
		receiveInCurrencyCode!: string;

  @IsNotEmpty()
  	receiveInCurrencyNetwork: string;

  @IsNotEmpty()
  @IsEnum( RampType )
  	orderType!: RampType;
}

export class GetRatesRes {
  @IsNotEmpty()
  	coin: string;

  @IsNotEmpty()
  	network: string;

  @IsNotEmpty()
  	exchangeRate: number;
}

export const GetRatesResource = new ScxEndpoint<GetRatesDto, GetRatesRes>( {
	path: '/rates',
	fullPath: `${TxUtilPath}/rates`,
	method: HttpMethods.Get
} );

export type GetRatesKeys = {
  GetRatesResource: string,
}

export const GetRatesEndpoints: ScxEndpoints<GetRatesKeys> = {
	GetRatesResource: GetRatesResource,
};
