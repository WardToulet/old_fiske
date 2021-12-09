import { RepositoryPort } from "@fiske/base-module/dist/ports";
import { Member, MemberProps } from "../entities/member.entity";

export interface MembersRepositoryPort extends RepositoryPort<Member, MemberProps> {} 
