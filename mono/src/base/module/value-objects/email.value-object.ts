import { ValueObject } from './value-object.base';

export class Email extends ValueObject<string>  {
	constructor(email: string) {
		super({ value: email });
	}

	get value() {
		return this.props.value;
	}
	// TODO: add some validation
}
