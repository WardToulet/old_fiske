import { RepositoryPort } from "@base/module";
import { Family, FamilyProps } from "../entities/family.entity";

export interface FamilyRepositoryPort extends RepositoryPort<Family, FamilyProps> {}
