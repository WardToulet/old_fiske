import { ValueObject } from "@base/module/value-objects/value-object.base";

export class Provider extends ValueObject<{
	provider: string,
	providerId: string,
}> {
	constructor(props: {
		provider: string,
		providerId: string,
	}) {
		super(props);
	}

	get provider(): string {
		return this.props.provider;			
	}

	get providerId(): string {
		return this.props.providerId;			
	}
}
