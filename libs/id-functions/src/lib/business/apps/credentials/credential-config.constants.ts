import { AppCredType, AvailableAppCredClaims } from "@scalex-africa/types";

const credentialTypePrefix: Record<AppCredType, string> = {
	[AppCredType.secretKey]: 'sk_',
	[AppCredType.publishableKey]: 'pk_',
	[AppCredType.webhookUrl]: '',
};

const credentialTypeLength: Record<AppCredType, number> = {
	[AppCredType.secretKey]: 32,
	[AppCredType.publishableKey]: 24,
	[AppCredType.webhookUrl]: 0
};

const credentialShouldEncrypt: Record<AppCredType, boolean> = {
	[AppCredType.secretKey]: true,
	[AppCredType.publishableKey]: false,
	[AppCredType.webhookUrl]: false,
};

const credentialAllowedClaims: Record<AppCredType, AvailableAppCredClaims[]> = {
	[AppCredType.secretKey]: [
		AvailableAppCredClaims.confirmTransaction,
		AvailableAppCredClaims.initiateTransaction,
		AvailableAppCredClaims.viewTransaction,
	],
	[AppCredType.publishableKey]: [
		AvailableAppCredClaims.initiateTransaction,
		AvailableAppCredClaims.viewTransaction,
	],
	[AppCredType.webhookUrl]: [
		AvailableAppCredClaims.confirmTransaction,
	],
};

const credentialNeedsGeneration: Record<AppCredType, boolean> = {
	[AppCredType.secretKey]: true,
	[AppCredType.publishableKey]: true,
	[AppCredType.webhookUrl]: false,
};

const credentialShouldHaveFirstFour: Record<AppCredType, boolean> = {
	[AppCredType.secretKey]: true,
	[AppCredType.publishableKey]: true,
	[AppCredType.webhookUrl]: false,
};

export {
	credentialTypePrefix,
	credentialTypeLength,
	credentialShouldEncrypt,
	credentialAllowedClaims,
	credentialNeedsGeneration,
	credentialShouldHaveFirstFour,
};
