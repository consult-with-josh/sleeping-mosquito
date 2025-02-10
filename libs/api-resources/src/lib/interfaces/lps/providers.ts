export enum LpProviders {
	XendBridge = 'XendBridge'
}
export enum LpPaymentMethod {
	Crypto = 'Crypto',
	Bank = 'Bank',
}

export enum LpFiatCurrencyNetwork {
	Local = 'LOCAL'
}

export interface LpApiCredentials {
	secretKey: string,
	staticUrl: string
}
