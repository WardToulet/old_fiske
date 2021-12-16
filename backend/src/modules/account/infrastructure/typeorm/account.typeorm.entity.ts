import { TypeormEntity } from '@base/typeorm';
import { Column, Entity } from 'typeorm';

@Entity('accounts')
export class TypeormAccount extends TypeormEntity {
	constructor(props: TypeormAccount) {
		super(props);
	}

	@Column()
	email: string;

	@Column()
	provider: string;

	@Column()
	providerId: string;
}
