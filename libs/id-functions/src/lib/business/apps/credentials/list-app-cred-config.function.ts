import { AppCredType, AvailableAppCredClaims, ListAppCredentialsConfigResource } from "@scalex-africa/types";
import { notifyClientOfSuccess } from "@scalex-api/api-resources";

export function listAppCredConfig(): typeof ListAppCredentialsConfigResource.response {
	return notifyClientOfSuccess( {
		data: {
			type: Object.values( AppCredType ),
			claims: Object.values( AvailableAppCredClaims )
		}
	} );
}
