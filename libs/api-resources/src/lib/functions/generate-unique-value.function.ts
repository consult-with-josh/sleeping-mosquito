import { Model } from 'mongoose';

const CHARS = '1234567890abcdefghijklmnopqrstuvwxyz';

function generateRandomSuffix( length: number ): string {
	let result = '';
	for ( let i = 0; i < length; i++ ) {
		const randomIndex = Math.floor( Math.random() * CHARS.length );
		result += CHARS[randomIndex];
	}
	return result;
}

function formatName( name: string ): string {
	return name
		.toLowerCase()
		.trim()
		.replace( /\s+/g, ' ' )
		.replace( /\s/g, '-' );
}

async function checkValueExists<T>(
	model: Model<T>, 
	path: keyof T,
	value: string
): Promise<boolean> {
	const existingDoc = await model.findOne( { [path]: value } as Record<keyof T, string> );
	return !!existingDoc;
}

async function generateUniqueNameWithSuffix<T>(
	model: Model<T>,
	path: keyof T, 
	formattedName: string,
	maxAttempts = 100
): Promise<string> {
	let attempts = 0;

	while ( attempts < maxAttempts ) {
		attempts++;
		const suffix = generateRandomSuffix( 4 );
		const nameWithSuffix = `${formattedName}-${suffix}`;
		
		const exists = await checkValueExists( model, path, nameWithSuffix );
		if ( !exists ) {
			return nameWithSuffix;
		}
	}

	throw new Error( `Failed to generate unique value after ${maxAttempts} attempts` );
}

export async function generateUniqueValue<T>(
	model: Model<T>,
	path: keyof T,
	name: string
): Promise<string> {
	const formattedName = formatName( name );

	const exists = await checkValueExists( model, path, formattedName );
	if ( !exists ) {
		return formattedName;
	}

	return generateUniqueNameWithSuffix( model, path, formattedName );
}
