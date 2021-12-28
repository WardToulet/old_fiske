import { Injectable } from "@nestjs/common";

import { Err, Result } from "@utils/result";
import { Option } from "@utils/option";

// import { Entity } from "@base/module/entity.base";
import { UUID } from "@base/module/value-objects/uuid.value-object";

import { MemberService } from "@module/member/domain/member.service";

import { GroupRepository } from "../infrastructure/typeorm/group.repository";
import { Group } from "./entities/group.entity";
import { DeleteError, SaveError } from "@base/module/ports/repository.port.base";

@Injectable()
export class GroupService {
	constructor(
		private readonly groupRepository: GroupRepository,
		private readonly memberService: MemberService,
	) {}

	async createGroup(): Promise<Result<Group, SaveError>> {
		const group = Group.create({
			members: [],
			privilegedAccounts: [],
		});

		return this.groupRepository.save(group);
	}

	// TODO: find a pattern that doesn't require fetching the 
	// entity from the db before deleting it (using only the id)
	// if the queery could not be executed this is a sign that it is a nonexisting id;
	async deleteGroup(uuid: UUID): Promise<Result<Group, DeleteError>> {
		const group = await this.groupRepository.findById(uuid.value);

		return group.isSome()
			? this.groupRepository.delete(group.unwrap())
			: new Err(new DeleteError());
	}

	async findAll(): Promise<Option<Group[]>> {
		return this.groupRepository.find();
	}

	async findById(id: UUID): Promise<Option<Group>> {
		return this.groupRepository.findById(id.value)
	}

	async addMember(groupId: UUID, memberId: UUID): Promise<Result<Group, SaveError>> {
		const [ group, member ] = await Promise.all([
			this.groupRepository.findById(groupId.value),
			this.memberService.findById(memberId),
		])

		if(group.isNone()) 
			return new Err(new SaveError())

		if(member.isNone()) 
			return new Err(new SaveError())

		const f = group.unwrap()

		f.addToArrayProp('members', member);

		return this.groupRepository.save(f);
	}
}
