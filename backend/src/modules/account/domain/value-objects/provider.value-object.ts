import { ValueObject } from "@base/module";

export class Provider extends ValueObject<{
	provider: string,
	providerId: string,
}> {
	get provider(): string { return this.provider }
	get providerId(): string { return this.providerId }
}
