import { HttpStatusCode } from "axios";
import { ScxError } from "../../responses";

enum KycErrorKeys {
	duplicateStageAlreadyExists = 'duplicateStageAlreadyExists',
	invalidDocumentType = 'invalidDocumentType',
}

export const KycErrors: {
	[key in KycErrorKeys]: ( ...args: unknown[] ) => ScxError
} = {
	[KycErrorKeys.duplicateStageAlreadyExists]: () => {
		return {
			statusCode: HttpStatusCode.Conflict,
			code: 'DUPLICATE_STAGE_ALREADY_EXISTS',
			message: `A KYC stage with the same data already exists`,
			recommendedActions: [
				`Kindly check the data and retry`
			]
		};
	},
	[KycErrorKeys.invalidDocumentType]: () => {
		return {
			statusCode: HttpStatusCode.BadRequest,
			code: 'INVALID_DOCUMENT_TYPE',
			message: `Invalid document type`,
			recommendedActions: [
				`Kindly check the document type and retry`
			]
		};
	}
};
