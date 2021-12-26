import { DateVO } from './value-objects/date.value-object';
import { ID } from './value-objects/id.value-object';

/**
 * Properties that are present on the base entity type 
 * and thus must be provided for every entity
 **/
export interface BaseEntityProps {
	id: ID;

	createdAt?: DateVO;
	updatedAt?: DateVO;
} 

export interface CreateEntityProps<EntityProps> {
	id: ID;
	
	props: EntityProps;
	
	createdAt?: DateVO;
	updatedAt?: DateVO;
}  

export abstract class Entity<EntityProps> {	
	protected readonly props: EntityProps;

	protected abstract _id: ID;
	protected readonly _createdAt: DateVO;
	protected _updatedAt: DateVO;
	
	constructor({
		id,
		createdAt,
		updatedAt,
		props,
	}: CreateEntityProps<EntityProps>) {
		this.setID(id);

		this._createdAt = createdAt ?? DateVO.now();
		this._updatedAt = updatedAt ?? DateVO.now();

		this.props = props;
	}

	private setID(id: ID): void {
		this._id = id;
	}

	get id(): ID {
		return this._id;	
	}

	get createdAt(): DateVO {
		return this._createdAt;
	}

	get updatedAt(): DateVO {
		return this._updatedAt;
	}

	// FIXME: this results in errors, I don't exactly know what is wrong
	update(props: Partial<EntityProps>): Entity<EntityProps> {
		Object.assign(this.props, props);
		return this;
	}

	/**
	 * Adds an element to an array property
	 **/
	// FIXME: use keyof to speciy that the key must be part of of entityProps type
	addToArrayProp(key: keyof EntityProps, value: unknown): Entity<EntityProps> {
		if(!Array.isArray(this.props[key]))
			throw `Tried to a value add to prop ${key} whitch is not an array.`

		this.props[key as string].push(value);

		return this;
	}
	
	getPropsCopy(): BaseEntityProps & EntityProps {
		const propsCopy = {
			id: this._id,

			createdAt : this._createdAt,
			updatedAt : this._updatedAt,

			...this.props,
		};

		return Object.freeze(propsCopy);
	}
}
