import { IBaseModel } from "../../generic";

export enum AuthenticationMethods {
	local = 'local',
	google = 'google'
}
export interface IPassword extends IBaseModel {
    token: string;
    hint: string;
    isActive: boolean
}

export enum UserStatus {
    active = 'active',
    suspended = 'suspended'
}

export interface IUserProfile {
  firstName: string;
  middleName?: string;
  lastName: string;
	profilePicture?: string;
}

export interface IOauthProfile {
	provider: AuthenticationMethods;
	accessToken?: string;
	refreshToken?: string;
	scope?: string;
	sub?: string;
}

export enum UserRole {
	Admin = 'admin',
	Customer = 'customer'
}

export interface IUser extends IBaseModel {
	email: string;
	username: string;
	phoneNumber: string;
	passwords?: Array<IPassword>;
	status: UserStatus;
	emailVerified: boolean;
	phoneNumberVerified: boolean;
	profile?: IUserProfile;
	role: UserRole,
	source: AuthenticationMethods;
	oauthProfiles?: Array<IOauthProfile>
}
