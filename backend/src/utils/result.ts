import { Option, Some, None } from "./option";

export abstract class Result<T, E> {
	abstract unwrap(): T;
	abstract unwrapOr(alternative: T): T;
	abstract unwrapOrElse(alternativeFn: () => T): T;

	abstract isOk(): boolean;
	abstract isErr(): boolean;

	abstract ok(): Option<T>;
	abstract err(): Option<E>;

	abstract and<U>(result: Result<U, E>): Result<U, E>;
	abstract andThen<U>(resultFn: (value: T) => Result<U, E>): Result<U, E>;

	abstract or(result: Result<T, E>): Result<T, E>;
	abstract orElse<U>(resultFn: (error: E) => Result<T, U>): Result<T, U>;

	abstract map<U>(mapFn: (value: T) => U): Result<U, E>;
	abstract mapErr<U>(mapFf: (error: E) =>  U): Result<T, U>;
}

export class Ok<T, E> implements Result<T, E> {
	private value: T;

	constructor(value: T) {
		this.value = value;
	}

	unwrap(): T {
		return this.value;
	}

	unwrapOr(_alternative: T): T {
		return this.value;
	}

	unwrapOrElse(_atlernativeFn: () => T): T {
		return this.value;
	}

	isOk(): boolean {
		return true;
	}

	isErr(): boolean {
		return false;
	}

	ok(): Option<T> {
		return new Some(this.value);
	}

	err(): Option<E> {
		return new None();
	}

	and<U>(result: Result<U, E>): Result<U, E> {
		return result;
	}

	andThen<U>(resultFn: (value: T) => Result<U, E>): Result<U, E> {
		return resultFn(this.value);
	}

	or(_result: Result<T, E>): Result<T, E> {
		return this;
	}

	orElse<U>(_resultFn: (error: E) => Result<T, U>): Result<T, U> {
		return new Ok<T, U>(this.value)
	}

	map<U>(mapFn: (value: T) => U): Result<U, E> {
		return new Ok<U, E>(mapFn(this.value));
	}

	mapErr<U>(_mapFn: (error: E) => U): Result<T, U> {
		return new Ok<T, U>(this.value);
	}
}

export class Err<T, E> implements Result<T, E> {
	private error: E;	

	constructor(error: E) {
		this.error = error;
	}

	unwrap(): T {
		throw this.error;
	}

	unwrapOr(alternative: T): T {
		return alternative;
	}
	
	unwrapOrElse(alternativeFn: () => T): T {
		return alternativeFn();
	}

	isOk(): boolean { 
		return false;
	}

	isErr(): boolean {
		return false;
	}

	ok(): Option<T> {
		return new None();
	}

	err(): Option<E> {
		return new Some(this.error);
	}

	and<U>(_result: Result<U, E>): Result<U, E> {
		return new Err<U, E>(this.error);
	}

	andThen<U>(_resultFn: (value: T) => Result<U, E>): Result<U, E> {
		return new Err<U, E>(this.error);
	}

	or(result: Result<T, E>): Result<T, E> {
		return result;
	}

	orElse<U>(resultFn: (value: E) => Result<T, U>): Result<T, U> {
		return resultFn(this.error);
	}

	map<U>(_mapFn: (value: T) => U): Result<U, E> {
		return new Err<U, E>(this.error);
	}

	mapErr<U>(mapFn: (error: E) =>  U): Result<T, U> {
		return new Err<T, U>(mapFn(this.error));
	}
}
