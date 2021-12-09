import { AggregateRoot, UUID } from "@fiske/base-module";

export type MemberProps = {
	firstname: string;
	lastname: string;
}

export class Member extends AggregateRoot<MemberProps> {
	protected readonly _id: UUID;
}
