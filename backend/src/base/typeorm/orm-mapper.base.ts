import { 
	AggregateRoot, 
	CreateEntityProps as CreateDomainEntityProps, 
	DateVO, 
	ID 
} from '@base/module';
import { TypeormEntity } from './typeorm.entity.base';

export type OrmEnitytProps<OrmEntity> = Omit<
	OrmEntity,
	'id' | 'createdAt' | 'updatedAt'
>

export interface EntityProps<EntityProps> {
	id: ID,
	props: EntityProps,
}


export abstract class OrmMapper<
	DomainEntity extends AggregateRoot<unknown>,
	OrmEntity
> {
	constructor(
		private domainEntityConstructor: new (domainEntity: CreateDomainEntityProps<any>) => DomainEntity,
		private ormEntityConstructor: new (props: any) => OrmEntity,
	) {}

	protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps<unknown>;
	protected abstract toOrmProps(domainEntity: DomainEntity): OrmEnitytProps<OrmEntity>;

	toDomainEntity(ormEntity: OrmEntity): DomainEntity {
		const { id, props } = this.toDomainProps(ormEntity);
		const ormEntityBase: TypeormEntity = (ormEntity as unknown) as TypeormEntity;

		return new this.domainEntityConstructor({
			id,

			createdAt: new DateVO(ormEntityBase.createdAt),
			updatedAt: new DateVO(ormEntityBase.updatedAt),

			props,
		});
	}

	toOrmEntity(domainEntity: DomainEntity): OrmEntity {
		const props = this.toOrmProps(domainEntity);

		return new this.ormEntityConstructor({
			...props,

			id: domainEntity.id.value,
		
			createdAt: domainEntity.createdAt.value,
			updatedAt: domainEntity.updatedAt.value,
			
		});
	}
}
