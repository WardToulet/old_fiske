import { Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';

import { TypeormEntity } from '@base/typeorm/typeorm.entity.base';

import { TypeormMember } from '@module/member/infrastructure/typeorm/member.typeorm.entity';
import { TypeormPrivilgedAccount } from './privileged-account.typeorm.entity';

@Entity('groups')
export class TypeormGroup extends TypeormEntity {
	constructor(props: TypeormGroup) {
		super(props);
	}

	@ManyToMany(_type => TypeormMember)
	@JoinTable()
	members: Promise<TypeormMember[]>;

	@OneToMany(
		_type => TypeormPrivilgedAccount, 
		(privilegedAccount: TypeormPrivilgedAccount) => privilegedAccount.group,
		{ nullable: false },
	)
	privilegedAccounts: Promise<TypeormPrivilgedAccount[]>;
}
