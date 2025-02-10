import { AuthenticationMethods, IOauthProfile, IPassword, IUser, IUserProfile, ScxErrors, UserRole, UserStatus } from "@scalex-api/sdk";
import { SchemaDefinition } from "mongoose";
import { OptionalSchema, RequiredBooleanDefaultFalse, RequiredBooleanDefaultTrue, RequiredEnum, RequiredString, RequiredStringWithDefault, ScxCollection } from "../../constants";
import { createModel } from "../../functions";
import { compareSync, hashSync } from "bcrypt";

const SaltRounds = 10;

interface UserMethods {
	updatePassword( newPassword: string, hint?: string ): void;
}

const userMethods: UserMethods = {
	updatePassword( newPassword: string, hint?: string ) {
		for ( const p of this.passwords ) {
			if ( compareSync( newPassword, p.token ) ) {
				throw ScxErrors.compromisedPassword( p.updatedAt );
			}
		}

		this.passwords.forEach( ( p: IPassword ) => {
			p.isActive = false;
		} );
		this.passwords.push( {
			token: hashSync( newPassword, SaltRounds ),
			hint,
			isActive: true,
		} );
	},
};

const passwordSchemaDef: SchemaDefinition<IPassword> = {
	token: RequiredString,
	hint: String,
	isActive: RequiredBooleanDefaultTrue
};

const userProfileSchemaDef: SchemaDefinition<IUserProfile> = {
	firstName: RequiredString,
	middleName: String,
	lastName: RequiredString,
	profilePicture: String,
};

const oauthProfileSchemaDef: SchemaDefinition<IOauthProfile> = {
	provider: RequiredEnum( AuthenticationMethods ),
	sub: String,
	scope: String,
};

const userSchemaDef: SchemaDefinition<IUser> = {
	email: RequiredString,
	username: String,
	passwords: OptionalSchema( [passwordSchemaDef] ),
	status: RequiredStringWithDefault( UserStatus.active, { enum: UserStatus } ),
	emailVerified: RequiredBooleanDefaultFalse,
	phoneNumberVerified: RequiredBooleanDefaultFalse,
	profile: OptionalSchema( userProfileSchemaDef ),
	role: RequiredStringWithDefault( UserRole.Customer, { enum: UserRole } ),
	source: RequiredStringWithDefault( AuthenticationMethods.local, { enum: AuthenticationMethods } ),
	oauthProfiles: OptionalSchema( [oauthProfileSchemaDef] )
};

export const User = createModel<IUser, UserMethods>( userSchemaDef, ScxCollection.user, userMethods );
