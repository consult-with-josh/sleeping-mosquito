import { Types } from "mongoose";
import { z } from "zod";
import { zBaseModelSch } from "../../generic";

export enum AvailableAppCredClaims {
	initiateTransaction = 'initiate-transaction',
	confirmTransaction = 'confirm-transaction',
	viewTransaction = 'view-transaction',
}

export enum AppCredType {
	secretKey = 'secret-key',
	publishableKey = 'publishable-key',
	webhookUrl = 'webhook-url',
}

export const zAppCred = z.object( {
	type: z.nativeEnum( AppCredType ),
	claims: z.array( z.nativeEnum( AvailableAppCredClaims ) ),
	name: z.string(),
	firstFour: z.string().optional(),
	value: z.string()
} );

export type IAppCredentialCredential = z.infer<typeof zAppCred>;

const zAppCredential = zBaseModelSch.extend( {
	app: z.instanceof( Types.ObjectId ),
	business: z.instanceof( Types.ObjectId ),
	credentials: z.array( zAppCred )
} );

export type IAppCredential = z.infer<typeof zAppCredential>;