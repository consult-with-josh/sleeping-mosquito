export function formatNumber(
	amount: number,
	options?: { currencySymbol?: string; includeCurrency?: boolean },
): string {
	const currencySymbol = options?.currencySymbol ?? "₦";
	const includeCurrency = options?.includeCurrency ?? true;
	const formattedNumber = amount.toLocaleString( "en-US", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	} );
	return includeCurrency ? `${currencySymbol}${formattedNumber}` : formattedNumber;
}

export function money( amount: number, currencySymbol = "₦" ) {
	return formatNumber( amount, { currencySymbol } );
}

export function notMoney( amount: number ) {
	return formatNumber( amount, { includeCurrency: false } ).split( "." )[0];
}
