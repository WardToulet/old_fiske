import { ValueObject } from '@fiske/base-module';

export enum Gender {
		Unkonwn = 0,
		Female  = 1,
		Male    = 2,
}

/**
 * A gender is specified by an @link{Gender} enum
 * valid numbers are:
 * - 0: unknown
 * - 1: female
 * - 2: male
 * More genders may be added later
 **/
export class GenderVO extends ValueObject<number>  {
	constructor(gender: number) {
		super({ value: gender });
	}

	get value() {
		return this.props.value;
	}
}

