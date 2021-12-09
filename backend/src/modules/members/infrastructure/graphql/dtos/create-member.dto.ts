import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateMember')
export class CreateMemberDTO {
	@Field()
	firstname: string;

	@Field()
	lastname: string;
}
