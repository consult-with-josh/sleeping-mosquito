import { z } from "zod";

export const zPagination = z.object( {
	limit: z.number().optional(),
	offset: z.number().optional()
} );

export const zPaginationMeta = z.object( {
	total: z.number(),
	page: z.number(),
	limit: z.number()
} );

export type PaginationMeta = z.infer<typeof zPaginationMeta>;
export type Pagination = z.infer<typeof zPagination>;

export function calculatePagination( { limit = 10, offset = 0 } ) {
	return {
		limit,
		offset,
		page: Math.floor( offset / limit ) + 1
	};
}
