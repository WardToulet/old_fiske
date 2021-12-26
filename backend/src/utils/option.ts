import { Result, Ok, Err } from './result';

export class NoneError extends Error {}

export abstract class Option<T> {
	/**
	 * Returns wether the Option is Some.
	 *
	 * @returns {boolean} The Option is some
	 **/
	abstract isSome(): boolean;

	/**
	 *  Returns wether the Option is None;
	 *
	 *  @return {boolean} The Option is none;
	 **/
	abstract isNone(): boolean;

	/**
	 * Unwrap the option. 
	 * If it is a Some it returns the value. 
	 * If it is a None it throws an error.
	 *
	 * @returns {T} The value if the option is Some<T>
	 * @throws {@link NoneError} If a None value is unwraped
	 **/
	abstract unwrap(): T;

	/**
	 * Unwrap the value insdie the option if it is Some otherwise return the alternative.
	 *
	 * @param {T} alterantive - the value to return if the None case.
	 * @returns {T} The value of Some or the alternative value in case of None.
	 **/
	abstract unwrapOr(alternative: T): T;

	/**
	 * Unrap the value insde the option if it is some, otherwise return the result of the alternativeFc
	 *
	 * @param {() => T} alternativeFn - a function that returns the alterative value in case of none.
	 * @returns {T} The value of Some, or the alternative
	 **/
	abstract unwrapOrElse(alternativeFn: () => T): T; 

	abstract map<U>(mapFn: (value: T) => U): Option<U>;
	abstract mapOr<U>(mapFn: (value: T) => U, alternative: U): Option<U>;
	abstract mapOrElse<U>(mapFn: (value: T) => U, alternativeFn: () => U): Option<U>;

	abstract okOr<E>(error: E): Result<T, E>;
	abstract okOrElse<E>(errornFn: () => E): Result<T, E>;

	abstract and<U>(alternative: Option<U>): Option<U>;
	abstract andThen<U>(alternativeFn: () => Option<U>): Option<U>;

	abstract or(alternative: Option<T>): Option<T>;
	abstract orElse(alterantiveFn: () => Option<T>): Option<T>;

	static some<T>(value: T) {
		return new Some<T>(value);
	}

	static none<T>() {
		return new None<T>();
	}
}

export class Some<T> implements Option<T> {
	private value: T;	

	constructor(value: T) {
		this.value = value;
	}

	isNone(): boolean {
		return false;
	}

	isSome(): boolean {
		return true;
	}

	unwrap(): T {
		return this.value;
	}

	unwrapOr(_alternative: T): T {
		return this.value;
	}

	unwrapOrElse(_alternativeFn: () => T): T {
		return this.value;
	}

	map<U>(mapFn: (value: T) => U): Option<U> {
		return new Some<U>(mapFn(this.value));
	}

	mapOr<U>(mapFn: (value: T) => U, _alternative: U): Option<U> {
		return new Some<U>(mapFn(this.value));
	}

	mapOrElse<U>(mapFn: (value: T) => U, _alternativeFn: () => U): Option<U> {
		return new Some<U>(mapFn(this.value));
	}

	okOr<E>(_error: E): Result<T, E> {
		return new Ok<T, E>(this.value)
	}

	okOrElse<E>(_errornFn: () => E): Result<T, E> {
		return new Ok<T, E>(this.value);
	}

	and<U>(alternative: Option<U>): Option<U> {
		return alternative;
	}

	andThen<U>(alternativeFn: () => Option<U>): Option<U> {
		return alternativeFn();
	}

	or(_alternative: Option<T>): Option<T> {
		return this;
	}

	orElse(_alterantiveFn: () => Option<T>): Option<T> {
		return this;
	}
}

export class None<T> implements Option<T> {
	isNone(): boolean {
		return false;
	}

	isSome(): boolean {
		return true;
	}

	unwrap(): T { 
		throw new NoneError();
	}

	unwrapOr(alternative: T): T {
		return alternative;
	}

	unwrapOrElse(alternativeFn: () => T): T {
		return alternativeFn();
	}

	map<U>(_mapFn: (value: T) => U): Option<U> {
		return new None<U>();
	}

	mapOr<U>(_mapFn: (value: T) => U, alternative: U): Option<U> {
		return new Some<U>(alternative);
	}

	mapOrElse<U>(mapFn: (value: T) => U, alternativeFn: () => U): Option<U> {
		return new Some<U>(alternativeFn());
	}

	okOr<E>(error: E): Result<T, E> {
		return new Err(error);
	}

	okOrElse<E>(errorFn: () => E): Result<T, E> {
		return new Err(errorFn());
	}

	and<U>(_alternative: Option<U>): Option<U> {
		return new None<U>();
	}

	andThen<U>(_alternativeFn: () => Option<U>): Option<U> {
		return new None<U>();
	}

	or(alternative: Option<T>): Option<T> {
		return alternative;
	}

	orElse(alternativeFn: () => Option<T>): Option<T> {
		return alternativeFn();
	}
}
