import { Injectable } from '@nestjs/common';

import { Option, Result, Err} from "@fiske/return-wrappers";

import { UUID } from '@fiske/base-module';
import { SaveError, DeleteError } from '@fiske/base-module';

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

	async delete(id: UUID): Promise<Result<Member, DeleteError>> {
		const member = await this.memberRepository.findById(id.value);

		return member.isSome()
			? this.memberRepository.delete(member.unwrap())
			: new Err(new SaveError())
	}

	async update({ id, ...props}: Partial<NewMemberProps> & { id: UUID }): Promise<Result<Member, SaveError>> {
		const member = await this.memberRepository.findById(id.value);

		if(member.isSome()) {
			const m = member.unwrap()
			m.update(props);
			return this.memberRepository.save(m);
		} else {
			return new Err(new SaveError());
		}
	}
}
