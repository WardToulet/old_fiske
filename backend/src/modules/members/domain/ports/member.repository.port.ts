import { RepositoryPort } from "@base/module";
import { Member, MemberProps } from "../entities/member.entity";

export interface MembersRepositoryPort extends RepositoryPort<Member, MemberProps> {} 
