import { TypeormEntity } from '@base/typeorm';
import { Column, Entity } from 'typeorm';

@Entity('members')
export class TypeormMember extends TypeormEntity {
	constructor(props: TypeormMember) {
		super(props);
	}

	@Column()
	firstname: string;

	@Column()
	lastname: string;

	@Column({ nullable: true })
	nickname?: string;

	@Column()
	gender: number;

	@Column()
	birthday: Date;
}
