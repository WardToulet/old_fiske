import { RepositoryPort } from '@base/module/ports/repository.port.base';
import { Member, MemberProps } from '../entities/member.entity';

export type MembersRepositoryPort = RepositoryPort<Member, MemberProps> 
