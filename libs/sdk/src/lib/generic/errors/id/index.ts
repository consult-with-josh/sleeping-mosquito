import { AuthErrors } from "./auth.errors";
import { KycErrors } from "./kyc.errors";

export const IdErrors = {
	...AuthErrors,
	...KycErrors
};