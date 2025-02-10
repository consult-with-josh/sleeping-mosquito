import { IsMongoId } from "class-validator";

export class HasQueryIdDto {
	@IsMongoId()
		id!: string;
}
