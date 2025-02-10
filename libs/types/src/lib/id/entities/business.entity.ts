import { zBaseModelSch, zIntegrationStatusSch } from "../../generic";
import { z } from "zod";

export const zBusiness = zBaseModelSch.extend( {
	name: z.string(),
	tagline: z.string().optional(),
	address: z.string().optional(),
	email: z.string().email(),
	status: zIntegrationStatusSch,
} );

export type IBusiness = z.infer<typeof zBusiness>;