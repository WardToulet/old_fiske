import { v4 as uuidV4 } from 'uuid';

import { ID } from './id.value-object';

export class UUID extends ID {	
	static generate(): UUID {
		return new UUID(uuidV4());
	}
}
