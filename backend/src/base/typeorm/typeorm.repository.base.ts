import { FindConditions, ObjectLiteral, Repository } from 'typeorm';

import { Result, Ok, Err } from "@utils/result";
import { Option, Some, None } from "@utils/option";

import { AggregateRoot } from "../module/aggregate-root.base";
import { RepositoryPort, QueryParams, SaveError, DeleteError, QueryOptions } from "../module/ports/repository.port.base"
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

	async save(entity: Entity): Promise<Result<Entity, SaveError>> {
		const res = this.repository
			.save(this.mapper.toOrmEntity(entity))
			.then(ormEntity => this.mapper.toDomainEntity(ormEntity))
			.then((result: Entity) => new Ok<Entity, SaveError>(result))
			.catch(e => new Err<Entity, SaveError>(new SaveError(e)))

		return res;
	}

	async findOne(params: QueryParams<EntityProps> = {}): Promise<Option<Entity>> {
		return this.repository
			.findOne({
				where: this.prepareQuery(params),
				relations: this.relations,
			})
			.then(ormEntity => this.mapper.toDomainEntity(ormEntity))
			.then(value => new Some<Entity>(value))
			.catch(_ => new None<Entity>());
	}

	async findById(id: string): Promise<Option<Entity>> {
		return this
			.repository.findOne({
				where: { id: id },
				relations: this.relations,
				loadEagerRelations: true,
			})
			.then(ormEntity => this.mapper.toDomainEntity(ormEntity))
			.then(value => new Some<Entity>(value))
			.catch(_ => new None<Entity>());
	}

	async find(params: QueryParams<EntityProps> = {}): Promise<Option<Entity[]>> {
		return this
			.repository.find({
				where: this.prepareQuery(params),
				relations: this.relations,
			})
			.then(results => results.map(ormEntity => this.mapper.toDomainEntity(ormEntity)))
			.then(values => new Some<Entity[]>(values))
			.catch(_ => new None<Entity[]>());
	}

	// NOTE: when calling remove the id is striped from the returented entity,
	// when using delete, we lose all the functionalities of cascade 
	// so we reiinject the id after the remove returns
	async delete(entity: Entity): Promise<Result<Entity, DeleteError>> {
		const { id } = entity;
		return this.repository
			.remove(this.mapper.toOrmEntity(entity))
			.then(ormEntity => this.mapper.toDomainEntity({ id, ...ormEntity }))
			.then(value => new Ok<Entity, DeleteError>(value))
			.catch(_ => new Err(new DeleteError));
	}
}
