export interface IFiatInFlow {
  reference: string;
  amount: number;
  status: string;
  sender: {
    bankCode: string;
    accountName: string;
    accountNumber: string;
    bankAccountName: string;
  };
  recipient: {
    bankCode: string;
    accountName: string;
    accountNumber: string;
    bankAccountName: string;
  };
  provider: string;
  thirdPartyTxRef: string;
}


export interface IUnidentifiableFiatFlow {
  reference: string;
  amount: number;
  status: string;
  sender: {
    bankCode: string;
    accountName: string;
    accountNumber: string;
    bankAccountName: string;
  };
  recipient: {
    bankCode: string;
    accountName: string;
    accountNumber: string;
    bankAccountName: string;
  };
  provider: string;
  thirdPartyTxRef: string;
}
