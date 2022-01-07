import { Option, Result } from '@fiske/return-wrappers';

import { BaseEntityProps } from '../entity.base';

export class SaveError extends Error {};
export class DeleteError extends Error {};

type DeepPartial<T>  = {
	[P in keyof T]?: DeepPartial<T[P]>;
};

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
	save(e: Entity): Promise<Result<Entity, SaveError>>
}

/**
 * Find only one of an entiyt based on it's properties
 **/
export interface FindOne<Entity, EntityProps> {
	findOne(params: QueryParams<EntityProps>): Promise<Option<Entity>>
}

/**
 * Find an entity by it's id
 **/
export interface FindById<Entity> {
	findById(id: string): Promise<Option<Entity>>;
}

/**
 * Find all matching entities
 **/
export interface Find<Entity, EntityProps> {
	find(params: QueryParams<EntityProps>): Promise<Option<Entity[]>>
}

/**
 * Delete an entity
 **/
export interface Delete<Entity> {
	delete(entity: Entity): Promise<Result<Entity, DeleteError>>;
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
