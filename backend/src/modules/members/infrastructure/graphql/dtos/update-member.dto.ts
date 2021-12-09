import { Field, InputType } from '@nestjs/graphql';

@InputType('UpdateMember')
export class UpdateMemberDTO {
	@Field({ nullable: true })
	firstname?: string;

	@Field({ nullable: true })
	lastname: string;
}
