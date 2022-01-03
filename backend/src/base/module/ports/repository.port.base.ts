import { BaseEntityProps } from '../entity.base';
import { Result } from '@utils/result';
import { Option } from '@utils/option';
import { KeysOfType } from '@utils/keys-of-type';

export class SaveError extends Error {};
export class DeleteError extends Error {};

type DeepPartial<T>  = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

export type QueryOptions<T> = {
	/**
	 * Instruct to eagerly get members that are wrapped by promises,
	 * by deafult this propertiyes wil be lazyly executed
	 **/
	eager: Array<KeysOfType<T, Promise<unknown>>>
}

/** 
 * A type based on the properies of en entity where all it's properties are 
 * not required, if they are provided the will be used in the query
 **/
export type QueryParams<EntityProps> = DeepPartial<
	BaseEntityProps & EntityProps
>

/**
 * The ability to persist an entity
 **/
export interface Save<Entity> {
	save(e: Entity, o?: QueryOptions<Entity>): Promise<Result<Entity, SaveError>>
}

/**
 * Find only one of an entiyt based on it's properties
 **/
export interface FindOne<Entity, EntityProps> {
	findOne(params: QueryParams<EntityProps>, o?: QueryOptions<Entity>): Promise<Option<Entity>>
}

/**
 * Find an entity by it's id
 **/
export interface FindById<Entity> {
	findById(id: string, o?: QueryOptions<Entity>): Promise<Option<Entity>>;
}

/**
 * Find all matching entities
 **/
export interface Find<Entity, EntityProps> {
	find(params: QueryParams<EntityProps>, o?: QueryOptions<Entity>): Promise<Option<Entity[]>>
}

/**
 * Delete an entity
 **/
export interface Delete<Entity> {
	delete(entity: Entity, o?: QueryOptions<Entity>): Promise<Result<Entity, DeleteError>>;
}

/** 
 * A collections of methods almost all repository
 * need to implement
 **/
export interface RepositoryPort<Entity, EntityProps> extends
	Save<Entity>,
	FindOne<Entity, EntityProps>,
	FindById<Entity>,
	Find<Entity, EntityProps>,
	Delete<Entity>
{}
