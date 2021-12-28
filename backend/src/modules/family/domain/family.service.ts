import { Injectable } from "@nestjs/common";

import { Err, Result } from "@utils/result";
import { Option } from "@utils/option";

// import { Entity } from "@base/module/entity.base";
import { UUID } from "@base/module/value-objects/uuid.value-object";

import { MemberService } from "@module/member/domain/member.service";

import { FamilyRepository } from "../infrastructure/typeorm/family.repository";
import { Family } from "./entities/family.entity";
import { DeleteError, SaveError } from "@base/module/ports/repository.port.base";

@Injectable()
export class FamilyService {
	constructor(
		private readonly familyRepository: FamilyRepository,
		private readonly memberService: MemberService,
	) {}

	async createFamily(): Promise<Result<Family, SaveError>> {
		const family = Family.create({
			accounts: [],
			members: [],
		});

		return this.familyRepository.save(family);
	}

	// TODO: find a pattern that doesn't require fetching the 
	// entity from the db before deleting it (using only the id)
	// if the queery could not be executed this is a sign that it is a nonexisting id;
	async deleteFamily(uuid: UUID): Promise<Result<Family, DeleteError>> {
		const family = await this.familyRepository.findById(uuid.value);

		return family.isSome()
			? this.familyRepository.delete(family.unwrap())
			: new Err(new DeleteError());
	}

	async findAll(): Promise<Option<Family[]>> {
		return this.familyRepository.find();
	}

	async addMember(familyId: UUID, memberId: UUID): Promise<Result<Family, SaveError>> {
		const [ family, member ] = await Promise.all([
			this.familyRepository.findById(familyId.value),
			this.memberService.findById(memberId),
		])

		if(family.isNone()) 
			return new Err(new SaveError())

		if(member.isNone()) 
			return new Err(new SaveError())

		const f = family.unwrap()

		f.addToArrayProp('members', member);

		return this.familyRepository.save(f);
	}
}
