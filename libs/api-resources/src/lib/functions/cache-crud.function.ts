import { createClient, RedisClientOptions } from "redis";

export async function writeToCache( key: string, expiry: number, value: string, cacheConfig: RedisClientOptions ) {
	const client = createClient( cacheConfig );
	await client.connect();
	await client.setEx(
		key,
		expiry,
		value
	);
	await client.disconnect();
}

export async function readFromCache<T>( key: string, cacheConfig: RedisClientOptions ): Promise<T | null> {
	const client = createClient( cacheConfig );
	await client.connect();
	const result = await client.get( key );
	await client.disconnect();
	if ( !result ) {
		return null as T | null;
	}
	

	if ( !isValidJSON( result ) ) {
		return result as T;
	}


	const data: T = JSON.parse( result );
	return data;
}

export async function deleteFromCache( key: string, cacheConfig: RedisClientOptions ) {
	const client = createClient( cacheConfig );
	await client.connect();
	await client.del( key );
	await client.disconnect();
}

const isValidJSON = ( str ) => {
	try {
		JSON.parse( str );
		return true;
	} catch {
		return false;
	}
};