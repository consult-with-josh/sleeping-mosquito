import { IBaseModel } from "@scalex-api/sdk";
import { ResourceOwner } from "./utility-enums";
import { IBankAccount } from "./fiat/bank.types";
import { CryptoProviders, FiatProviders } from "../enums";

export type ITransactionParticipant = {
  type?: ResourceOwner;
  id?: string;
  isInternal: boolean;
  address?: string;
  addressPassword?: string;
  bankAccount?: IBankAccount;ß
}

export enum TransactionType {
    onramp = 'onramp',
    offramp = 'offramp',
    transfer = 'transfer',
    deposit = 'deposit'
}

export enum TransactionStatus {
    initiated = 'initiated',
    awaitingConsumation = 'awaiting-consumation',
    processing = 'processing',
    successful = 'successful',
    failed = 'failed',
    expired = 'expired',
    cancelled = 'cancelled'
}

export interface ITransaction extends IBaseModel {
  reference: string;
  dealId: string;
  type: TransactionType;
  status: TransactionStatus;
  buyAsset: {
    asset: string;
    network?: string;
    amount: number;
  };
  payWithAsset: {
    asset: string;
    network?: string;
    amount: number;
  };
  walletAddress?: string;
  bankAccount?: IBankAccount;
  fee: {
    amount: number;
    currency: string;
  };
  rate: {
    value: number;
    base: string;
    quote: string;
  };
  meta: {
    provider: CryptoProviders | FiatProviders;
    providerReference?: string;
    transactionHash?: string;
    initiatedAt: Date;
    completedAt?: Date;
  };
}
