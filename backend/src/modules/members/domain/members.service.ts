import { Injectable } from '@nestjs/common';
import { MembersRepository } from '../infrastructure/typeorm/members.repository';
import { Member, NewMemberProps } from './entities/member.entity';

@Injectable()
export class MembersService {
	constructor(
		private membersRepository: MembersRepository,
	) {}

	async findAll(): Promise<Member[]> {
		// return this.members;
		return this.membersRepository.find();
	}

	async create(props: NewMemberProps): Promise<Member> {
		const member = Member.create(props);
		return this.membersRepository.save(member);
	}

	async delete(uuid: string): Promise<Member> {
		const member = await this.membersRepository.findById(uuid);

		return this.membersRepository.delete(member);
	}

	async update(uuid: string, props: Partial<NewMemberProps>): Promise<Member> {
		const member = await this.membersRepository.findById(uuid);
		
		member.update(props);

		return this.membersRepository.save(member);
	}
}
