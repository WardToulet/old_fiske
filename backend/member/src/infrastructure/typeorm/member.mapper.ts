import { UUID, DateVO, } from '@fiske/base-module';
import { OrmMapper, OrmEnitytProps, EntityProps } from '@fiske/base-typeorm';

import { Member, MemberProps } from '../../domain/entities/member.entity';
import { GenderVO } from '../../domain/value-objects/gender.value-object';

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

