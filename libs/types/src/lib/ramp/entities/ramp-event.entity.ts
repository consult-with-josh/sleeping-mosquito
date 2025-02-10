import { Types } from "mongoose";
import { zBaseModelSch } from "../../generic";
import { z } from "zod";
import { RampState } from "./ramp.entity";

export enum RampEventSource {
	user = "user",
	system = "system",
}

export const zRampEvent = zBaseModelSch.extend( {
	ramp: z.instanceof( Types.ObjectId ),
	logs: z.array( z.object( {
		action: z.string(),
		description: z.string(),
		state: z.nativeEnum( RampState ),
		source: z.nativeEnum( RampEventSource ),
	} ) ),
} );

export type IRampEvent = z.infer<typeof zRampEvent>;
