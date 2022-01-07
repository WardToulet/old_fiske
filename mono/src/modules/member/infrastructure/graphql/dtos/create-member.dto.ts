import { InputType, OmitType } from '@nestjs/graphql';
import { MemberDTO } from './member.dto';

@InputType('CreateMember')
export class CreateMemberDTO extends OmitType(MemberDTO, ['id'] as const, InputType) {};
