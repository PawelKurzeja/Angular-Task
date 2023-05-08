import { createAction, props } from '@ngrx/store';
import { DepartmentModel } from '../../../models/department.model';
import { UserModel } from '../../../models/user.model';

const prefix = `[Departments]`;

// Departments get
export const DepartmentsLoadingStarted = createAction(`${prefix} Departments loading started`);
export const DepartmentsLoadingSucceeded = createAction(
  `${prefix} Departments loading started succeeded`,
  props<{ departments: DepartmentModel[] }>()
);
export const DepartmentsLoadingFailed = createAction(`${prefix} Departments loading started failed`, props<{ error: unknown }>());

// Department select
export const DepartmentSelected = createAction(`${prefix} Department selected`, props<{ department: DepartmentModel }>());
export const DepartmentSelectedClear = createAction(`${prefix} Department selected clear`);

// Department modify
export const DepartmentModificationStarted = createAction(`${prefix} Department modification started`, props<{ name: string }>());
// hack in-memory-web-api
export const DepartmentCustomModifyOnUserCreation = createAction(
  `${prefix} Department custom modification on user creation started`,
  props<{ departmentId: number; user: UserModel }>()
);

// Department create
export const DepartmentCreatingStarted = createAction(`${prefix} Department creating started`, props<{ name: string }>());
export const DepartmentCreatingSucceeded = createAction(`${prefix} Department creating succeeded`, props<{ department: DepartmentModel }>());
export const DepartmentCreatingFailed = createAction(`${prefix} Department creating failed`, props<{ error: unknown }>());

// Department edit
export const DepartmentEditSelected = createAction(`${prefix} Department edit selected`, props<{ department: DepartmentModel }>());
export const DepartmentEditSelectedClear = createAction(`${prefix} Department edit select cleared`);

export const DepartmentEditingStarted = createAction(`${prefix} Department editing started`, props<{ department: DepartmentModel }>());
export const DepartmentEditingSucceeded = createAction(`${prefix} Department editing succeeded`, props<{ department: DepartmentModel }>());
export const DepartmentEditingFailed = createAction(`${prefix} Department editing failed`, props<{ error: unknown }>());

// Department delete
export const DepartmentDeletingStarted = createAction(`${prefix} Department deleting started`, props<{ department: DepartmentModel }>());
export const DepartmentDeletingSucceeded = createAction(`${prefix} Department deleting succeeded`, props<{ department: DepartmentModel }>());
export const DepartmentDeletingFailed = createAction(`${prefix} Department deleting failed`, props<{ error: unknown }>());
