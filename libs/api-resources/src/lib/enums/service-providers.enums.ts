export enum FiatProviders {
	Paystack = 'paystack',
	Bani = 'bani',
	Payaza = 'payaza',
	Paga = 'paga',
}

export enum CryptoProviders {
	Shyft = 'shyft',
	Liminal = 'liminal',
	Bitnob = 'bitnob',
}

export function createServiceProviders<
  T extends { [key: string]: string },
  U extends { [key: string]: string }
>( enum1: T, enum2: U ): { [K in keyof T | keyof U]: string } {
	return { ...enum1, ...enum2 };
}

export const ServiceProviders = createServiceProviders(
	FiatProviders,
	CryptoProviders
);


export enum KycProviders {
	SmileIdentity = 'smile-identity',
}

export const AllServiceProviders = ( Object.values( FiatProviders ) as Array<string> )
	.concat( Object.values( CryptoProviders ) )
	.concat( Object.values( KycProviders ) );
