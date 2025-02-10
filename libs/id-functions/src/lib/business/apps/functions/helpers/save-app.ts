import {
	CreateAppResource,
	UpdateAppResource,
} from '@scalex-africa/types';
import { generateUniqueValue } from '@scalex-api/api-resources';
import { App } from '@scalex-api/db';
import { randomBytes, createHash } from 'crypto';

async function generateUniqueApiKey(
	length: number
): Promise<{ raw: string; hashed: string }> {
	const raw = randomBytes( length ).toString( 'hex' );
	const hashed = createHash( 'sha256' ).update( raw ).digest( 'hex' );
	return { raw, hashed };
}

export async function saveAppToDb( payload: typeof CreateAppResource.body ) {
	const accountId = `${randomBytes( 10 ).toString( 'hex' )}`;
	const app = await App.model.create( {
		...payload,
		accountId: await generateUniqueValue( App.model, 'accountId', accountId ),
		slug: await generateUniqueValue( App.model, 'slug', payload.name )
	} );
	const secretKey = await generateUniqueApiKey( 32 );
	const publishableKey = await generateUniqueApiKey( 8 );

	return {
		app,
		apiKeys: {
			secretKey: secretKey.raw,
			publishableKey: publishableKey.raw,
		},
	};
}

export async function updateAppInDb(
	id: string,
	payload: typeof UpdateAppResource.body
) {
	const app = await App.model.findByIdAndUpdate( id, payload, { new: true } );
	return app?.toObject();
}
