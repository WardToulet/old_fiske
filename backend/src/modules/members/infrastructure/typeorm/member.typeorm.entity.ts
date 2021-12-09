import { TypeormEntity } from "@base/typeorm";
import { Column, Entity } from "typeorm";

@Entity('member')
export class TypeormMember extends TypeormEntity {
	constructor(props: TypeormMember) {
		super(props);
	}

	@Column()
	firstname: string;

	@Column()
	lastname: string;
}
