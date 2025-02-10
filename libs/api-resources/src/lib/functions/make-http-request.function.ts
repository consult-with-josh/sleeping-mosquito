/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, Method } from "axios";

export interface Auth {
	username: string,
	password: string
}

export interface Proxy {
	host: string,
	port: number,
	auth: Auth,
}

export enum AcceptedHeaders {
	Authorization = "authorization",
	RefreshToken = "refreshtoken",
	RequestOrigin = "request-origin",
	DeviceUniqueId = "device-unique-id",
	AdminAuthToken = "admin-auth-token",
	ShyftApiKey = "x-api-key",
	AppId = "app-id",
	PublishableKey = "publishable-key",
	SecretKey = "secret-key",
	SessionId = "session-id",
}

export interface Auth {
	username: string,
	password: string
}

export interface Proxy {
	host: string,
	port: number,
	auth: Auth,
}

export function makeHttpRequest( {
	method,
	url,
	body,
	headers,
	query,
	auth,
	proxy,
}: {
	method: Method;
	url: string;
	body?: unknown;
	headers?: any;
	query?: any;
	auth?: Auth;
	proxy?: Proxy;
} ): Promise<AxiosResponse> {
	const aggregatedHeaders: any = {
		"Content-Type": "application/json",
	};
	if ( headers ) {
		for ( const h in headers ) {
			if ( 
				Object.values( AcceptedHeaders as any ).includes( h )
				|| Object.keys( AcceptedHeaders ).includes( h )
			) {
				aggregatedHeaders[h] = headers[h];
			}
		}
	}
	return axios( {
		method,
		url,
		data: body,
		auth,
		headers: aggregatedHeaders,
		params: query,
		proxy,
	} );
}
