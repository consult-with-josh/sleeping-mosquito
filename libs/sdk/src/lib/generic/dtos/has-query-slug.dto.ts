import { IsString } from "class-validator";

export class HasQuerySlugDto {
	@IsString()
		slug: string;
}