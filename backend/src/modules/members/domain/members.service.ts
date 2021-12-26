import { Injectable } from '@nestjs/common';

import { Err, Result } from "@utils/result";
import { Option } from "@utils/option";

import { UUID } from '@base/module/value-objects/uuid.value-object';
import { SaveError, DeleteError } from '@base/module/ports/repository.port.base';

import { MembersRepository } from '../infrastructure/typeorm/members.repository';
import { Member, NewMemberProps } from './entities/member.entity';

@Injectable()
export class MembersService {
	constructor(
		private membersRepository: MembersRepository,
	) {}

	async findAll(): Promise<Option<Member[]>> {
		// return this.members;
		return this.membersRepository.find();
	}

	async findById(id: UUID): Promise<Option<Member>> {
		return this.membersRepository.findById(id.value);
	}

	async create(props: NewMemberProps): Promise<Result<Member, SaveError>> {
		const member = Member.create(props);
		return this.membersRepository.save(member);
	}

	async delete(uuid: string): Promise<Result<Member, DeleteError>> {
		const member = await this.membersRepository.findById(uuid);

		return member.isSome()
			? this.membersRepository.delete(member.unwrap())
			: new Err(new SaveError())
	}

	async update(uuid: string, props: Partial<NewMemberProps>): Promise<Result<Member, SaveError>> {
		const member = await this.membersRepository.findById(uuid);

		if(member.isSome()) {
			const m = member.unwrap()
			m.update(props);
			return this.membersRepository.save(m);
		} else {
			return new Err(new SaveError());
		}
	}
}
