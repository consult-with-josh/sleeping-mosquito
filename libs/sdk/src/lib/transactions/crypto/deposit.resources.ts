import { IsNotEmpty, Min } from "class-validator";
import { HttpMethods, IEmptyResponse, ScxEndpoint, ScxEndpoints } from "../../generic";
import { CryptoDepositPath } from "./paths.config";
import { ICryptoInFlow } from "./flow.types";

export class CryptoDepositDto implements ICryptoInFlow {
	@IsNotEmpty()
		reference!: string;

	@IsNotEmpty()
  @Min( 0 )
		amount!: number;

	@IsNotEmpty()
		sourceAddress!: string;

  @IsNotEmpty()
  	recipient!: {
      recipientAddress: string;
      recipientType: string;
      recipientId: string
    };

  @IsNotEmpty()
  	currency!: {
      coin: string,
      network: string,
      chainId: string
    };

  @IsNotEmpty()
  	hash!: string;

  @IsNotEmpty()
  	thirdPartyTxRef!: string;

  @IsNotEmpty()
  	provider!: string;
}

export const CryptoDepositResource = new ScxEndpoint<CryptoDepositDto, IEmptyResponse>( {
	path: '/:provider',
	fullPath: `${CryptoDepositPath}/:provider`,
	method: HttpMethods.Post
} );

export type CryptoDepositKeys = {
  CryptoDepositResource: string,
}

export const CryptoDepositEndpoints: ScxEndpoints<CryptoDepositKeys> = {
	CryptoDepositResource: CryptoDepositResource,
};
