import { HttpStatusCode } from "axios";
import { ScxError } from "../responses";


export const GenericErrors = {
	invalidPayload: ( e: unknown ): ScxError => {
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
	resourceNotFound: ( resource: string ): ScxError => {
		return {
			statusCode: HttpStatusCode.NotFound,
			code: 'RESOURCE_NOT_FOUND',
			message: `${resource} not found`,
			recommendedActions: [
				`Kindly check your request and retry`
			],
		};
	},
	unauthorized: (): ScxError => {
		return {
			statusCode: HttpStatusCode.Unauthorized,
			code: 'UNAUTHORIZED',
			message: 'Access denied',
			recommendedActions: [
				`Kindly check your request and retry`
			],
		};
	},
	couldNotCreateResource: ( resource: string ): ScxError => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'COULD_NOT_CREATE_RESOURCE',
			message: `Could not create ${resource}`,
			recommendedActions: [
				`Kindly check your request and retry`
			],
		};
	},
	duplicateResource: ( resource: string ): ScxError => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'DUPLICATE_RESOURCE',
			message: `${resource} already exists`,
		};
	},
	badRequest: ( e: unknown ) => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'BAD_REQUEST',
			message: 'Some invalid data was provided',
			recommendedActions: [
				`Kindly check your request and retry`
			],
			data: e
		};
	},
	invalidRequest: ( message = 'Invalid request' ) => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'INVALID_REQUEST',
			message,
		};
	},
	internalServerError: ( message = 'Internal server error.' ) => {
		return {
			statusCode: HttpStatusCode.InternalServerError,
			code: 'INTERNAL_SERVER_ERROR',
			message,
		};
	}
};
