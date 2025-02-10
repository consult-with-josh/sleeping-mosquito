import { Types } from "mongoose";
import { zBaseModelSch } from "../../generic";
import { z } from "zod";
export enum TransactionType {
    crypto = 'crypto',
    fiat = 'fiat',
}

export enum TransactionStatus {
	initiated = 'initiated',
	processing = 'processing',
	successful = 'successful',
	failed = 'failed',
	expired = 'expired',
	cancelled = 'cancelled'
}

export const zTransactionParticipant = z.object( {
	walletAddress: z.string().optional(),
	bankAccount: z.instanceof( Types.ObjectId ).optional(),
} );


export const zTransaction = zBaseModelSch.extend( {
	type: z.nativeEnum( TransactionType ),
	status: z.nativeEnum( TransactionStatus ),
	ref: z.string(),
	ramp: z.instanceof( Types.ObjectId ),
	amount: z.number(),
	asset: z.instanceof( Types.ObjectId ),
	network: z.instanceof( Types.ObjectId ).optional(),
	source: zTransactionParticipant,
	destination: zTransactionParticipant,
} );
