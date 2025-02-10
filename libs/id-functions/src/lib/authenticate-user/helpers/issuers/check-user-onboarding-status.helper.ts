import { IUser, ServiceDenialActions, TokenActions } from "@scalex-api/sdk";
import { HydratedDocument } from "mongoose";

export type OnboardingStatus = {
	user: HydratedDocument<IUser>;
	currentState: TokenActions;
	actions: Array<TokenActions>
	denyService: boolean;
}

export async function checkUserOnboardingStatus( user: HydratedDocument<IUser> ): Promise<OnboardingStatus> {
	let currentState = TokenActions.verifyEmail;
	const actions = [TokenActions.verifyEmail];
	if ( user.emailVerified ) {
		currentState = TokenActions.createProfile;
		actions.push( TokenActions.createProfile );
		
		if ( user.profile?.firstName ) {
			currentState = TokenActions.doKyc;
			actions.push( TokenActions.doKyc );
		}
	}

	return {
		user,
		currentState,
		actions,
		denyService: ServiceDenialActions[currentState]
	};
}