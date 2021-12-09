export type Primitive = string | number | boolean;

/**
 * Wrapper for primitive values (including dates) used inside the domain
 **/
export interface DomainPrimitive<T extends Primitive | Date> {
	value: T
}

/**
 * If the property is a primitive value (sting, number, boolean or date) it is wrapped by
 * [DomainPrimitive]
 *
 * Otherwise it is just the type of the object.
 **/
type ValueObjectProps<T> = T extends Primitive | Date 
	? DomainPrimitive<T>
	: T

export abstract class ValueObject<T> {	
	/**
	 * The raw object containg the properties of the [VaueObject]
	 **/
	protected readonly props: ValueObjectProps<T>;

	constructor(props: ValueObjectProps<T>) {
		this.props = props;
	}
}
