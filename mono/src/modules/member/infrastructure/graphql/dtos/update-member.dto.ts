import { InputType, PartialType, ID, Field } from '@nestjs/graphql';
import { CreateMemberDTO }  from './create-member.dto';

@InputType('UpdateMember')
export class UpdateMemberDTO extends PartialType(CreateMemberDTO) {
	@Field(_type => ID)
	id: string;
}
