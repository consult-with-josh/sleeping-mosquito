import { GenericErrors } from "./generic.errors";
import { IdErrors } from "./id";
import { SystemErrors } from "./utils";

export const ScxErrors = {
	...GenericErrors,
	...IdErrors,
	...SystemErrors
};
