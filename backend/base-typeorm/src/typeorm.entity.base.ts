import { CreateDateColumn, PrimaryColumn, UpdateDateColumn } from "typeorm";

export abstract class TypeormEntity {
	constructor(props: unknown) {
		Object.assign(this, props);	
	}

	@PrimaryColumn()
	id: string;

	@CreateDateColumn({ update: false })
	createdAt: Date;

	@UpdateDateColumn({})
	updatedAt: Date;

}
