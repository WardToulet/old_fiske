import { ValueObject } from "./value-object.base";

export abstract class ID extends ValueObject<string> {
	constructor(value: string) {
		super({ value });
	}

	public get value() {
		return this.props.value;
	}
}
