export enum CurrencyType {
  Crypto = "crypto",
  Fiat = "fiat"
}

export type ICurrencyAndAmount = {
  currencyType: CurrencyType;
  currency: {
      id: string;
      networkId?: string;
      chainId?: string;
  }
  amount: number;
}
