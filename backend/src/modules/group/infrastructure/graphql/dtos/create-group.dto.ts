import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateGroupDTO {
	@Field(_type => [ID], { nullable: false })
	members: string[];
}
