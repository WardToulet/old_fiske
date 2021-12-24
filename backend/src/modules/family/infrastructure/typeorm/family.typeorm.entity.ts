import { ManyToMany, Entity } from 'typeorm';

import { TypeormEntity } from '@base/typeorm';
import { TypeormMember } from '@module/members';
import { TypeormAccount } from '@module/account/infrastructure/typeorm/account.typeorm.entity';


@Entity('families')
export class TypeormFamily extends TypeormEntity {
	constructor(props: TypeormFamily) {
		super(props);
	}

	@ManyToMany(_type => TypeormMember)
	members: TypeormMember[];

	@ManyToMany(_type => TypeormAccount)
	accounts: TypeormAccount[];
}
