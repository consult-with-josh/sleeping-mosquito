import { ZodSchema } from "zod";
import { EmptySuccessResponse, ScxSuccessRes } from "../responses";

export enum HttpMethods {
	Post = 'post',
	Put = 'put',
	Get = 'get',
	Patch = 'patch',
	Delete = 'delete'
}

export type ScxEndpointSchema<B, R, Q> = {
	body: ZodSchema<B>;
	query: ZodSchema<Q>;
	response: ZodSchema<R>;
}


export class ScxEndpoint<BodyType = unknown, ResponseType = unknown, QueryType = unknown> {
	path?: string;
	method!: HttpMethods;
	fullPath?: string;
	parentModule?: string;
	schema?: ScxEndpointSchema<BodyType, ResponseType, QueryType>;
	name?: string;
	tags?: Array<string>;
	description?: string;
	response?: ScxSuccessRes<ResponseType>;
	body?: BodyType;
	query?: QueryType;
	resourceName?: string;
	
	constructor( ep: ScxEndpoint<BodyType, ResponseType, QueryType> ) {
		Object.assign( this, ep );
	}
}

export type ScxEndpoints<T> = {
	[k in keyof T]: ScxEndpoint<unknown, unknown, unknown>;
}

export function declareResource<B = never, R = EmptySuccessResponse, Q = never>( ep: Omit<ScxEndpoint<B, R, Q>, 'response' | 'body' | 'query'> ) {
	return new ScxEndpoint<B, R, Q>( {
		...ep,
		response: {} as ScxSuccessRes<R>,
		body: {} as B,
		query: {} as Q
	} );
}