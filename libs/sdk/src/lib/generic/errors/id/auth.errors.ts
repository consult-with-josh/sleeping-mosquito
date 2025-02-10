import { HttpStatusCode } from "axios";
import { ScxError } from "../../responses";

export enum AuthErrorKeys {
	invalidCredentials = 'invalidCredentials',
	invalidAuthMethod = 'invalidAuthMethod',
	unsupportedAuthMethod = 'unsupportedAuthMethod',
	compromisedPassword = 'compromisedPassword',
}

export const AuthErrors: {
	[key in AuthErrorKeys]: ( ...args: unknown[] ) => ScxError
} = {
	[AuthErrorKeys.invalidCredentials]: () => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'INVALID_CREDENTIALS',
			message: `Invalid credentials`,
			recommendedActions: [
				`Kindly check your credentials and retry`
			]
		};
	},
	[AuthErrorKeys.invalidAuthMethod]: () => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'INVALID_AUTH_METHOD',
			message: `Invalid authentication method`,
			recommendedActions: [
				`Kindly check your authentication method and retry`
			]
		};
	},
	[AuthErrorKeys.unsupportedAuthMethod]: () => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'UNSUPPORTED_AUTH_METHOD',
			message: `Unsupported authentication method`,
			recommendedActions: [
				`Kindly check your authentication method and retry`
			]
		};
	},
	[AuthErrorKeys.compromisedPassword]: ( changeDate: Date ) => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'COMPROMISED_PASSWORD',
			message: `This password is compromised. It was changed on ${changeDate.toDateString()}`,
			recommendedActions: [
				`Try using a totally different password`
			],
			description: `This happens when a user tries to use a password they already changed for some reason in the past`
		};
	}
};