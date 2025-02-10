export function getStaticIpProxy( staticUrl: string ){
	const proxy = new URL( staticUrl );
	return {
		host: proxy.hostname,
		port: Number( proxy.port ),
		auth: {
			username: proxy.username || '',
			password: proxy.password || '',
		}
	};
}