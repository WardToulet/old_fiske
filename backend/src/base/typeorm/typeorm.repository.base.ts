import { AggregateRoot, QueryParams, RepositoryPort } from '@base/module';
import { FindConditions, ObjectLiteral, Repository } from 'typeorm';
import { OrmMapper } from './orm-mapper.base';

export type WhereCondition<OrmEntity> =
	| FindConditions<OrmEntity>[]
	| FindConditions<OrmEntity>
	| ObjectLiteral
	| string;

export abstract class TypeormRepository<
	Entity extends AggregateRoot<unknown>,
	EntityProps,
	OrmEntity,
> implements RepositoryPort<Entity, EntityProps> {

	protected constructor(
		protected readonly repository: Repository<OrmEntity>,
		protected readonly mapper: OrmMapper<Entity, OrmEntity>,
	) {}

	protected abstract relations: string[];

	protected abstract prepareQuery(params: QueryParams<EntityProps>): WhereCondition<OrmEntity>;

	async save(entity: Entity): Promise<Entity> {
		const ormEntity = this.mapper.toOrmEntity(entity);

		const result = await this.repository.save(ormEntity); 


		return this.mapper.toDomainEntity(result);
	}

	async findOne(params: QueryParams<EntityProps> = {}): Promise<Entity | undefined> {
		const where = this.prepareQuery(params);	
		const found = await this.repository.findOne({
			where,
			relations: this.relations,
		});
		
		// Return mapped if found otherwise return undefind
		return found && this.mapper.toDomainEntity(found);
	}

	async findById(id: string): Promise<Entity> {
		const found = await this.repository.findOne({
			where: { id: id },
			relations: this.relations,
		});


		return this.mapper.toDomainEntity(found);
	}

	async find(params: QueryParams<EntityProps> = {}): Promise<Entity[]> {
		const where = this.prepareQuery(params);	
		const found = await this.repository.find({
			where,
			relations: this.relations,
		});
		
		return found.map(ormEntity => this.mapper.toDomainEntity(ormEntity));
	}

	async delete(entity: Entity): Promise<Entity> {
		await this.repository.remove(this.mapper.toOrmEntity(entity));

		return entity;
	}
}
