import { IUser, ScxErrors } from '@scalex-api/sdk';
import { compareSync } from 'bcrypt';
import { HydratedDocument } from 'mongoose';

export async function authenticateWithLocalStrategy( user: HydratedDocument<IUser>, password: string ) {
	const activePassword = user.passwords.find( p => p.isActive );
	const passwordIsCorrect = compareSync( password, activePassword.token );
	if ( !passwordIsCorrect ) {
		throw ScxErrors.invalidCredentials();
	}
	return true;
}
