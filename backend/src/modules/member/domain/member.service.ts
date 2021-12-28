import { Injectable } from '@nestjs/common';

import { Err, Result } from "@utils/result";
import { Option } from "@utils/option";

import { UUID } from '@base/module/value-objects/uuid.value-object';
import { SaveError, DeleteError } from '@base/module/ports/repository.port.base';

import { MemberRepository } from '../infrastructure/typeorm/member.repository';
import { Member, NewMemberProps } from './entities/member.entity';

@Injectable()
export class MemberService {
	constructor(
		private memberRepository: MemberRepository,
	) {}

	async findAll(): Promise<Option<Member[]>> {
		return this.memberRepository.find();
	}

	async findById(id: UUID): Promise<Option<Member>> {
		return this.memberRepository.findById(id.value);
	}

	async create(props: NewMemberProps): Promise<Result<Member, SaveError>> {
		const member = Member.create(props);
		return this.memberRepository.save(member);
	}

	async delete(uuid: string): Promise<Result<Member, DeleteError>> {
		const member = await this.memberRepository.findById(uuid);

		return member.isSome()
			? this.memberRepository.delete(member.unwrap())
			: new Err(new SaveError())
	}

	async update(uuid: string, props: Partial<NewMemberProps>): Promise<Result<Member, SaveError>> {
		const member = await this.memberRepository.findById(uuid);

		if(member.isSome()) {
			const m = member.unwrap()
			m.update(props);
			return this.memberRepository.save(m);
		} else {
			return new Err(new SaveError());
		}
	}
}
