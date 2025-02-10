import { User } from "@scalex-api/api-resources";
import { IUser } from "@scalex-api/sdk";
import { HydratedDocument } from "mongoose";

export async function checkAccountExists( email: string ): Promise<HydratedDocument<IUser>> {
	return await User.model.findOne( { email } );
}