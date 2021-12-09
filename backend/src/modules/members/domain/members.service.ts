import { Injectable } from "@nestjs/common";
import { MembersRepository } from "../infrastructure/typeorm/members.repository";
import { Member } from "./entities/member.entity";

@Injectable()
export class MembersService {
	constructor(
		private membersRepository: MembersRepository,
	) {}

	async findAll(): Promise<Member[]> {
		// return this.members;
		return this.membersRepository.find();
	}

	async create(): Promise<Member> {

	}
}
