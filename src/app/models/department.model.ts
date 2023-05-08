import { isNotNullOrUndefined } from '../core/utils/object';
import { Identifiable } from '../core/models/object.models';

export interface DepartmentModel extends Identifiable<number> {
  name: string;
  users: number[];
}

export const isDepartmentModel = (x: unknown): x is DepartmentModel => {
  const maybeDepartmentModel = x as DepartmentModel;
  return (
    isNotNullOrUndefined(maybeDepartmentModel.id) &&
    isNotNullOrUndefined(maybeDepartmentModel.name) &&
    isNotNullOrUndefined(maybeDepartmentModel.users) &&
    Array.isArray(maybeDepartmentModel.users)
  );
};
