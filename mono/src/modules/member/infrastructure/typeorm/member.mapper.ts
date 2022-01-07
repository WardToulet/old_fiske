import { DateVO } from '@base/module/value-objects';
import { UUID } from '@base/module/value-objects/uuid.value-object';
import { EntityProps, OrmEnitytProps, OrmMapper } from '@base/typeorm';
import { GenderVO } from '@module/member/domain/value-objects/gender.value-object';
import { Member, MemberProps } from '../../domain/entities/member.entity';
import { TypeormMember } from './member.typeorm.entity';

export class MemberMapper extends OrmMapper<Member, TypeormMember> {
	constructor() {
		super(Member, TypeormMember);
	}

	protected toDomainProps({ id, birthday, gender,...rest}: TypeormMember): EntityProps<unknown> {
	  const uuid = new UUID(id);

	  const props: MemberProps = {
			birthday: new DateVO(birthday),
			gender: new GenderVO(gender),
			...rest
	  };
	
	  return { id: uuid, props };
	}

	protected toOrmProps(domainEntity: Member): OrmEnitytProps<TypeormMember> {
	  const { gender, birthday, ...props} = domainEntity.getPropsCopy();

	  return {
			gender: gender?.value,
			birthday: birthday?.value,
			...props,
		};
	}
}

