export enum Queues {
  bani = 'bani',
  paga = 'paga',
  payaza = 'payaza',
  liminal = 'liminal',
  shyft = 'shyft'
}

export const RetryQueue = 'retry-queue';

export enum TransactionFlow {
  cryptoInflow = 'crypto.inflow',
  cryptoOutflow = 'crypto.outflow',
  cryptoUnidentifiableFlow = 'crypto.unidentifiable.flow',
  fiatInflow = 'fiat.inflow',
  fiatOutflow = 'fiat.outflow',
  fiatUnidentifiableFlow = 'fiat.unidentifiable.flow',
}
