export function makeArrayUnique<T>( assets: Array<T> ): Array<T> {
	return Array.from(
		new Set( assets.map( asset => JSON.stringify( asset ) ) )
	).map( asset => JSON.parse( asset ) ) as Array<T>;
}
