import { Entity } from "./entity.base";

type DomainEvent = {};

export abstract class AggregateRoot<EntityProps> extends Entity<EntityProps> {
	private _domainEvents: DomainEvent[] = [];	

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	protected addEvent(domainEvent: DomainEvent) {
		this._domainEvents.push(domainEvent);
	}

	public clearEvents(): void {
		this._domainEvents = [];
	}

}
