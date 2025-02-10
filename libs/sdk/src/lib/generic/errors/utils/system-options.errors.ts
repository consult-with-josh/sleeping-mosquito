//

import { HttpStatusCode } from "axios";
import { ScxError } from "../../responses";

export enum SystemOptionsErrorKeys {
	systemOptionNotFound = 'systemOptionNotFound',
}

export const SystemErrors: {
  [key in SystemOptionsErrorKeys]: ( ...args: Array<unknown> ) => ScxError
} = {
	[SystemOptionsErrorKeys.systemOptionNotFound]: function ( enumKey: string ) {
		return {
			statusCode: HttpStatusCode.NotFound,
			code: 'SYSTEM_OPTION_NOT_FOUND',
			message: `No options found for ${enumKey}`,
			recommendedActions: [
				`Kindly check your request payload and retry`
			],
		};
	}
};
