import { IUser } from "@scalex-api/sdk";

export const UserSlackMessages = {
	newUser( user: Partial<IUser> ) {
		return `
        :clap::clap:  Email verification request! 

        ${user.email} just requested OTP for email verification
        =========================================`;
	},
};