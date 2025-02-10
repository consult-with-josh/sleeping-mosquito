import { ScxError } from "@scalex-api/sdk";
import { HttpStatusCode } from "axios";

export const GenericErrors = {
	unidentifiedError: ( e: unknown ): ScxError => {
		console.log( e );
		return {
			statusCode: HttpStatusCode.InternalServerError,
			code: `UNIDIENTIFIED_ERROR`,
			message: "You're experiencing a bug we've not encountered yet",
			recommendedActions: ["Reach out to support"],
		};
	},
	resourceNotFound: ( name: string ): ScxError => {
		return {
			statusCode: HttpStatusCode.NotFound,
			code: `RESOURCE_NOT_FOUND`,
			message: `This ${name} does not exist`,
			recommendedActions: [
				"Ensure you're using the most up-to-date version of the app",
				"Reload the page",
				"Close and reopen the whole app entirely",
				"Log out and log back in",
				"Contact support if it persists"
			]
		};
	},
	duplicateResource: ( name: string ): ScxError => {
		return {
			statusCode: HttpStatusCode.NotFound,
			code: `DUPLICATE_RESOURCE_FOUND`,
			message: `This ${name} already exists`,
			recommendedActions: [
				"Ensure you're using the most up-to-date version of the app",
				"Reload the page",
				"Close and reopen the whole app entirely",
				"Log out and log back in",
				"Contact support if it persists"
			]
		};
	},
	tooManyRequests: ( limit = 1 ): ScxError => {
		return {
			statusCode: HttpStatusCode.TooManyRequests,
			code: `TOO_MANY_REQUESTS`,
			message: `You've made too many requests. Please wait ${limit} minute${ limit !== 1 ? 's' : '' } before trying again`
		};
	},
	unfinishedJob: ( task: string ): ScxError => {
		return {
			statusCode: HttpStatusCode.Conflict,
			code: `UNFINISHED_JOB`,
			message: `You already have an ongoing ${task} job. Please wait for it to complete before starting another one`
		};
	}
};
