import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateFamilyDTO {
	@Field(_type => [ID], { nullable: false })
	members: string[];

	@Field(_type => [ID], { nullable: false })
	accounts: string[];
}
