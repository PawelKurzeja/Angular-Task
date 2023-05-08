import { createReducer, on } from '@ngrx/store';
import { initialDepartmentsState } from './departments.state';
import {
  DepartmentCreatingSucceeded,
  DepartmentCustomModifyOnUserCreation,
  DepartmentDeletingFailed,
  DepartmentDeletingStarted,
  DepartmentDeletingSucceeded,
  DepartmentEditSelected,
  DepartmentEditSelectedClear,
  DepartmentEditingFailed,
  DepartmentEditingStarted,
  DepartmentEditingSucceeded,
  DepartmentSelected,
  DepartmentSelectedClear,
  DepartmentsLoadingFailed,
  DepartmentsLoadingStarted,
  DepartmentsLoadingSucceeded,
} from './departments.actions';
import { hasSameId, hasNotSameId, isNotNull } from '../../utils/object';
import { Readiness } from '../../models/readiness.model';

export const departmentsReducer = createReducer(
  initialDepartmentsState,
  // Departments get
  on(DepartmentsLoadingStarted, (state) => ({
    ...state,
    departments: {
      ...state.departments,
      readiness: Readiness.Pending,
    },
  })),
  on(DepartmentsLoadingSucceeded, (state, { departments }) => ({
    ...state,
    departments: {
      records: departments,
      readiness: Readiness.Ready,
    },
  })),
  on(DepartmentsLoadingFailed, (state) => ({
    ...state,
    departments: {
      ...state.departments,
      readiness: Readiness.Error,
    },
  })),
  // Department create
  on(DepartmentsLoadingStarted, (state) => ({
    ...state,
    departments: {
      ...state.departments,
      readiness: Readiness.Pending,
    },
  })),
  on(DepartmentCreatingSucceeded, (state, { department }) => ({
    ...state,
    departments: {
      records: [...state.departments.records, department],
      readiness: Readiness.Ready,
    },
  })),
  on(DepartmentsLoadingFailed, (state) => ({
    ...state,
    departments: {
      ...state.departments,
      readiness: Readiness.Error,
    },
  })),
  // Department edit
  on(DepartmentEditSelected, (state, { department }) => ({ ...state, editDepartment: department })),
  on(DepartmentEditSelectedClear, (state) => ({ ...state, editDepartment: null })),

  on(DepartmentEditingStarted, (state) => ({ ...state, departments: { ...state.departments, readiness: Readiness.Pending } })),
  on(DepartmentEditingSucceeded, (state, { department }) => {
    const records = state.departments.records.map((record) => (hasSameId(department)(record) ? department : record));

    return {
      ...state,
      departments: {
        records,
        readiness: Readiness.Ready,
      },
      editDepartment: null,
      selectedDepartment: null,
    };
  }),
  on(DepartmentEditingFailed, (state) => ({ ...state, departments: { ...state.departments, readiness: Readiness.Error } })),
  // Department delete
  on(DepartmentDeletingStarted, (state) => ({ ...state, departments: { ...state.departments, readiness: Readiness.Pending } })),
  on(DepartmentDeletingSucceeded, (state, { department }) => {
    const records = state.departments.records.filter(hasNotSameId(department));
    const selectedDepartment =
      isNotNull(state.selectedDepartment) && hasSameId(state.selectedDepartment)(department) ? null : state.selectedDepartment;
    return {
      ...state,
      departments: {
        records,
        readiness: Readiness.Ready,
      },
      editDepartment: null,
      selectedDepartment,
    };
  }),
  on(DepartmentDeletingFailed, (state) => ({ ...state, departments: { ...state.departments, readiness: Readiness.Error } })),
  // Department selected
  on(DepartmentSelected, (state, { department }) => {
    return {
      ...state,
      selectedDepartment: department,
    };
  }),
  on(DepartmentSelectedClear, (state) => ({ ...state, selectedDepartment: null })),
  // Department custom modification
  on(DepartmentCustomModifyOnUserCreation, (state, { departmentId, user }) => {
    const records = state.departments.records.map((department) => {
      let users = department.users;
      if (department.id === departmentId) {
        users = [...department.users, user.id];
      } else {
        users = users.filter((id) => id !== user.id);
      }
      return {
        ...department,
        users,
      };
    });
    return {
      ...state,
      selectedDepartment: null,
      departments: {
        ...state.departments,
        records,
      },
    };
  })
);
