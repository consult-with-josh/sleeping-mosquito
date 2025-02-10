export interface ICryptoInFlow {
	reference: string;
	amount: number;
	sourceAddress: string;
	recipient: {
	  recipientAddress: string;
	  recipientType: string;
	  recipientId: string
	},
	currency: {
	  coin: string,
	  network: string,
	  chainId: string
	},
	hash: string;
	thirdPartyTxRef: string;
	provider: string
}

export interface IUnidentifiableCryptoFlow {
	reference: string;
	amount: number;
	sourceAddress: string;
	recipient: {
	  recipientAddress: string;
	  recipientType: string;
	  recipientId: string
	},
	currency: {
	  coin: string,
	  network: string,
	  chainId: string
	},
	hash: string;
	thirdPartyTxRef: string;
	provider: string
}