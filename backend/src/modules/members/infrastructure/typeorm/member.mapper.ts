import { UUID } from '@base/module';
import { EntityProps, OrmEnitytProps, OrmMapper } from '@base/typeorm';
import { Member, MemberProps } from '../../domain/entities/member.entity';
import { TypeormMember } from './member.typeorm.entity';

export class MemberMapper extends OrmMapper<Member, TypeormMember> {
	protected toDomainProps(ormEntity: TypeormMember): EntityProps<unknown> {
	    const id = new UUID(ormEntity.id);
	    const props: MemberProps = {
			firstname: ormEntity.firstname,
			lastname: ormEntity.lastname,
	    };
	
	    return { id, props };
	}

	protected toOrmProps(domainEntity: Member): OrmEnitytProps<TypeormMember> {
	    const props = domainEntity.getPropsCopy();

	    // Just using props, because no flattening of nested values needed
	    const ormProps: OrmEnitytProps<TypeormMember> = props;

	    return ormProps;
	}
}

