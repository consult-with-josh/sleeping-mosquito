import { z } from "zod";
import { zBaseModelSch } from "../../generic";
import { Types } from "mongoose";

export enum RampState {
	initiated = "initiated",
	processing = "processing",
	completed = "completed",
	failed = "failed",
}

export enum RampStatus {
	initiated = "initiated",
	completed = "completed",
	failed = "failed",
	expired = "expired",
	cancelled = "cancelled",
	awaitingUserPayment = "awaiting-user-payment",
	userIndicatedPayment = "user-indicated-payment",
	confirmedUserPayment = "confirmed-user-payment",
	processingConsummation = "processing-consummation",
	completedConsummation = "completed-consummation",
	failedConsummationWillRetry = "failed-consummation-will-retry",
	failedConsummationWillNotRetry = "failed-consummation-will-not-retry",
	retryingConsummation = "retrying-consummation",
}

export const zRampAmount = z.object( {
	initiated: z.number(),
	toBeCompleted: z.number(),
	completed: z.number(),
} );

export const zRampDealDetail = z.object( {
	asset: z.string(),
	network: z.string(),
	amount: zRampAmount,
} );

const zRamp = zBaseModelSch.extend( {
	app: z.instanceof( Types.ObjectId ),
	deal: z.instanceof( Types.ObjectId ),
	business: z.instanceof( Types.ObjectId ),
	session: z.string(),
	ref: z.string(),
	status: z.nativeEnum( RampStatus ),
	state: z.nativeEnum( RampState ),
	buy: zRampDealDetail.extend( {
		destination: z.string()
	} ),
	payWith: zRampDealDetail.extend( {
		source: z.string()
	} ),
} );

export type IRamp = z.infer<typeof zRamp>;
export type IRampDealDetail = z.infer<typeof zRampDealDetail>;
export type IRampAmount = z.infer<typeof zRampAmount>;
