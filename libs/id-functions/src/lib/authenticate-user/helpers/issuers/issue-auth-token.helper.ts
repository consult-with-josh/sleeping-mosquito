import { sign } from 'jsonwebtoken';
import { AuthUserResource, CookieKey, CookieStructure, IUser, TokenActions, TokenExpiry } from '@scalex-api/sdk';
import { HydratedDocument } from 'mongoose';
import { notifyClientOfSuccess } from '@scalex-api/api-resources';
import { checkUserOnboardingStatus } from './check-user-onboarding-status.helper';

export function issueJwtToken(
	user: Partial<IUser>,
	actions: Array<TokenActions>,
	currentState: TokenActions,
	secret: string
) {

	return sign(
		{
			user: {
				_id: user._id,
				createdAt: user.createdAt,
				fullName: user.profile,
				email: user.email,
			},
			actions,
			currentState
		},
		secret,
		{
			expiresIn: TokenExpiry[ currentState ]
		}
	);
}

export async function sendAuthDetails( user: HydratedDocument<IUser>, jwtSecret: string )
: Promise<typeof AuthUserResource.response> {
	const cookies: Array<CookieStructure> = [];
	const onboardingStatus = await checkUserOnboardingStatus( user );
	const token = issueJwtToken(
		onboardingStatus.user,
		onboardingStatus.actions,
		onboardingStatus.currentState,
		jwtSecret
	);
	cookies.push( { key: CookieKey.authToken, value: token } );

	return notifyClientOfSuccess( { data: 
			{
				user: { _id: user._id, email: user.email, profile: user.profile },
				cookies
			}
	} );
}