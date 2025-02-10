import { User } from "@scalex-api/api-resources";
import { IUser } from "@scalex-api/sdk";
import { HydratedDocument } from "mongoose";
import { CreateUserAccountArgs } from "./authenticators/auth-types";

export async function createUserAccount(
	payload: CreateUserAccountArgs
): Promise<HydratedDocument<IUser>> {
	const user = await User.model.create( {
		email: payload.email,
		emailVerified: payload.emailVerified,
		source: payload.source,
		profile: payload.firstName || payload.lastName ? {
			firstName: payload.firstName,
			lastName: payload.lastName,
			profilePicture: payload.profilePicture
		} : undefined,
		oauthProfiles: payload.oauthProfile ? [payload.oauthProfile] : []
	} );
	if ( payload.password ) {
		user.updatePassword( payload.password );
		await user.save();
	};
	return user;
}