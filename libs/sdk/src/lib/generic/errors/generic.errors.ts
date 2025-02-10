import { HttpStatusCode } from "axios";
import { ScxError } from "../responses";

export enum GenericErrorKeys {
	invalidPayload = 'invalidPayload',
	resourceNotFound = 'resourceNotFound',
	unAuthorized = 'unAuthorized',
	badRequest = 'badRequest'
}

export const GenericErrors: {
	[key in GenericErrorKeys]: ( ...args: Array<unknown> ) => ScxError
} = {
	[GenericErrorKeys.invalidPayload]: ( e: unknown ) => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'INVALID_PAYLOAD',
			message: `Invalid payload`,
			recommendedActions: [
				`Kindly check your payload and retry`
			],
			data: e
		};
	},
	[GenericErrorKeys.resourceNotFound]: ( resource: string ) => {
		return {
			statusCode: HttpStatusCode.NotFound,
			code: 'RESOURCE_NOT_FOUND',
			message: `${resource} not found`,
			recommendedActions: [
				`Kindly check your request and retry`
			],
		};
	},
	[GenericErrorKeys.unAuthorized]: () => {
		return {
			statusCode: HttpStatusCode.Unauthorized,
			code: 'UNAUTHORIZED',
			message: 'Access denied',
			recommendedActions: [
				`Kindly check your request and retry`
			],
		};
	},
	[GenericErrorKeys.badRequest]: ( e: unknown ) => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'BAD_REQUEST',
			message: 'Some invalid data was provided',
			recommendedActions: [
				`Kindly check your request and retry`
			],
			data: e
		};
	}
};
