import { v4 as uuidV4, validate, version } from 'uuid';

import { ID } from './id.value-object';

export class UUID extends ID {	
	static generate(): UUID {
		return new UUID(uuidV4());
	}

	static fromString(str: string) {
		if(version(str) !== 4 || !validate(str))
			throw new Error('Not a valid uuid v4');

		return new UUID(str);
	}
}
