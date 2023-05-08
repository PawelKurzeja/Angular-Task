import { isNotNullOrUndefined } from '../core/utils/object';
import { DepartmentModel } from './department.model';
import { Identifiable } from '../core/models/object.models';

export interface UserBaseModel {
  name: string;
  email: string;
}

export interface UserModifyModel extends UserBaseModel {
  department: DepartmentModel;
}

export interface UserModel extends Identifiable<number> {
  name: string;
  email: string;
}

export const isUserModel = (x: unknown): x is UserModel => {
  const maybeUserModel = x as UserModel;
  return isNotNullOrUndefined(maybeUserModel.id) && isNotNullOrUndefined(maybeUserModel.name) && isNotNullOrUndefined(maybeUserModel.email);
};
