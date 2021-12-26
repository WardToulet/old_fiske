import { RepositoryPort } from "@base/module/ports/repository.port.base";
import { Group, GroupProps } from "../entities/group.entity";

export interface GroupRepositoryPort extends RepositoryPort<Group, GroupProps> {};
