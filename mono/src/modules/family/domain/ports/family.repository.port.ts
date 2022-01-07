import { RepositoryPort } from "@base/module/ports/repository.port.base";
import { Family, FamilyProps } from "../entities/family.entity";

export interface FamilyRepositoryPort extends RepositoryPort<Family, FamilyProps> {};
