import { DepartmentModel } from '../../models/department.model';
import { Identifiable } from '../../core/models/object.models';

export interface DepartmentBaseDTO {
  name: string;
  users: number[];
}

export interface DepartmentReadDTO extends DepartmentBaseDTO, Identifiable<number> {}

export const fromDepartmentReadDTO = ({ name, users, id }: DepartmentReadDTO): DepartmentModel => ({
  name,
  users,
  id,
});
