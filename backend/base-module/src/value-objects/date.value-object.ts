import { ValueObject } from "./value-object.base";

export class DateVO extends ValueObject<Date> {
	constructor(value: Date | string | number) {
		const datePrimitive = new Date(value);
		super({ value: datePrimitive });
	}

	public get value(): Date {
		return this.props.value;
	}	

	public static now(): DateVO {
		return new DateVO(Date.now());
	}

}
