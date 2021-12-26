import { Entity, ManyToMany, JoinTable } from 'typeorm';

import { TypeormEntity } from '@base/typeorm/typeorm.entity.base';

import { TypeormAccount } from '@module/account/infrastructure/typeorm/account.typeorm.entity';
import { TypeormMember } from '@module/members';

@Entity('families')
export class TypeormFamily extends TypeormEntity {
	constructor(props: TypeormFamily) {
		super(props);
	}

	@ManyToMany(_type => TypeormMember)
	@JoinTable()
	members: TypeormMember[];

	@ManyToMany(_type => TypeormAccount)
	@JoinTable()
	accounts: TypeormAccount[];
}

