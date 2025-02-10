import { ZodSchema } from "zod";
import { EmptySuccessResponse, ScxSuccessRes } from "./responses";

export enum HttpMethods {
	Post = 'post',
	Put = 'put',
	Get = 'get',
	Patch = 'patch',
	Delete = 'delete'
}

export type ScxEndpointSchema<B, R, Q, H = never> = {
	body: ZodSchema<B>;
	query: ZodSchema<Q>;
	response: ZodSchema<R>;
	headers?: ZodSchema<H>;
}


export class ScxEndpoint<BodyType = unknown, ResponseType = unknown, QueryType = unknown, HeadersType = never> {
	path?: string;
	method!: HttpMethods;
	fullPath?: string;
	parentModule?: string;
	schema?: ScxEndpointSchema<BodyType, ResponseType, QueryType, HeadersType>;
	name?: string;
	tags?: Array<string>;
	description?: string;
	response!: ScxSuccessRes<ResponseType>;
	body!: BodyType;
	query!: QueryType;
	headers!: HeadersType;
	resourceName?: string;
	desc?: string;
	
	constructor( ep: ScxEndpoint<BodyType, ResponseType, QueryType, HeadersType> ) {
		Object.assign( this, ep );
	}
}

export type ScxEndpoints<T> = {
	[k in keyof T]: ScxEndpoint<unknown, unknown, unknown, unknown>;
}

export function declareResource<B = never, R = EmptySuccessResponse, Q = never, H = never>(
	ep: Omit<ScxEndpoint<B, R, Q, H>, 'response' | 'body' | 'query' | 'headers'>
) {
	return new ScxEndpoint<B, R, Q, H>( {
		...ep,
		response: {} as ScxSuccessRes<R>,
		body: {} as B,
		query: {} as Q,
		headers: {} as H
	} );
}
