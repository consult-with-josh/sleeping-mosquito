import { z } from "zod";

export const zQueryId = z.object( {
	id: z.string()
} );

export type QueryIdSchema = z.infer<typeof zQueryId>;