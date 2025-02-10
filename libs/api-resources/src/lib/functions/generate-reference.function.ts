import { randomBytes } from 'crypto';

export const REFERENCE_PREFIXES = {
	TRANSACTION: 'TRX',
	PAYMENT: 'PAY',
	WITHDRAWAL: 'WTH',
	DEPOSIT: 'DEP',
} as const;

export type ReferenceType = keyof typeof REFERENCE_PREFIXES;

export function generateReference(
	type: ReferenceType,
	length = 8
): string {
	const randomString = randomBytes( Math.ceil( length / 2 ) )
		.toString( 'hex' )
		.slice( 0, length )
		.toUpperCase();

	const prefix = REFERENCE_PREFIXES[type];

	return `${prefix}_${randomString}`;
}
