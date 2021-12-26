import { Entity, ManyToMany, JoinTable } from 'typeorm';

import { TypeormEntity } from '@base/typeorm/typeorm.entity.base';

import { TypeormMember } from '@module/members';

@Entity('groups')
export class TypeormGroup extends TypeormEntity {
	constructor(props: TypeormGroup) {
		super(props);
	}

	@ManyToMany(_type => TypeormMember)
	@JoinTable()
	members: TypeormMember[];
}

