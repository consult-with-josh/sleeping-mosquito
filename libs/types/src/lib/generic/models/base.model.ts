import { Types } from "mongoose";
import { z } from "zod";

export const zBaseModelSch = z.object( {
	_id: z.instanceof( Types.ObjectId ).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
} );

export type BaseModel = z.infer<typeof zBaseModelSch>;

export enum IntegrationStatus {
	active = 'active',
	inactive = 'inactive',
	awaitingApproval = 'awaiting-approval',
	suspended = 'suspended',
	closed = 'closed',
}

export const zIntegrationStatusSch = z.nativeEnum( IntegrationStatus );

export enum YesOrNo {
	yes = 'yes',
	no = 'no',
}

export const zYesOrNo = z.nativeEnum( YesOrNo );