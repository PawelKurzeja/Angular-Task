import { departmentsReducer } from './departments/departments.reducer';
import { usersReducer } from './users/users.reducer';

export enum Features {
  Departments = 'departments',
  Users = 'users',
}

export const storeReducer = {
  [Features.Departments]: departmentsReducer,
  [Features.Users]: usersReducer,
};
