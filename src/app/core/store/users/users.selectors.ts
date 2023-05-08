import { createFeatureSelector, createSelector } from '@ngrx/store';
import { isNull } from '../../utils/object';
import { selectSelectedDepartment } from '../departments/departments.selectors';
import { UsersState } from './users.state';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(selectUsersState, (state) => state.users);

export const selectUsersReadiness = createSelector(selectUsersState, (state) => state.users.readiness);

export const selectEditUser = createSelector(selectUsersState, (state) => state.editUser);

export const selectDepartmentUsers = createSelector(selectUsersState, selectSelectedDepartment, (usersState, selectedDepartment) => {
  if (isNull(selectedDepartment)) {
    return usersState.users;
  } else {
    return { ...usersState.users, records: usersState.users.records.filter((user) => selectedDepartment.users.includes(user.id)) };
  }
});
