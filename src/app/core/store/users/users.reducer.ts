import { createReducer, on } from '@ngrx/store';
import { hasNotSameId, hasSameId } from '../../utils/object';
import {
  UserCreatingFailed,
  UserCreatingSucceeded,
  UserDeletingFailed,
  UserDeletingStarted,
  UserDeletingSucceeded,
  UserEditSelected,
  UserEditSelectedClear,
  UserEditingFailed,
  UserEditingStarted,
  UserEditingSucceeded,
  UsersLoadingFailed,
  UsersLoadingStarted,
  UsersLoadingSucceeded,
} from './users.actions';
import { initialUsersState } from './users.state';
import { Readiness } from '../../models/readiness.model';

export const usersReducer = createReducer(
  initialUsersState,
  // Users get
  on(UsersLoadingStarted, (state) => ({
    ...state,
    users: {
      ...state.users,
      readiness: Readiness.Pending,
    },
  })),
  on(UsersLoadingSucceeded, (state, { users }) => ({
    ...state,
    users: {
      records: users,
      readiness: Readiness.Ready,
    },
  })),
  on(UsersLoadingFailed, (state) => ({
    ...state,
    users: {
      ...state.users,
      readiness: Readiness.Error,
    },
  })),
  // User create
  on(UsersLoadingStarted, (state) => ({
    ...state,
    users: {
      ...state.users,
      readiness: Readiness.Pending,
    },
  })),
  on(UserCreatingSucceeded, (state, { user }) => ({
    ...state,
    users: {
      records: [...state.users.records, user],
      readiness: Readiness.Ready,
    },
  })),
  on(UserCreatingFailed, (state) => ({
    ...state,
    users: {
      ...state.users,
      readiness: Readiness.Error,
    },
  })),
  // User edit
  on(UserEditSelected, (state, { user }) => ({ ...state, editUser: user })),
  on(UserEditSelectedClear, (state) => ({ ...state, editUser: null })),

  on(UserEditingStarted, (state) => ({ ...state, users: { ...state.users, readiness: Readiness.Pending } })),
  on(UserEditingSucceeded, (state, { user }) => {
    const records = state.users.records.map((record) => (hasSameId(user)(record) ? user : record));

    return {
      ...state,
      users: {
        records,
        readiness: Readiness.Ready,
      },
      editUser: null,
    };
  }),
  on(UserEditingFailed, (state) => ({ ...state, users: { ...state.users, readiness: Readiness.Error } })),
  // User delete
  on(UserDeletingStarted, (state) => ({ ...state, users: { ...state.users, readiness: Readiness.Pending } })),
  on(UserDeletingSucceeded, (state, { user }) => {
    const records = state.users.records.filter(hasNotSameId(user));
    return {
      ...state,
      users: {
        records,
        readiness: Readiness.Ready,
      },
      editUser: null,
    };
  }),
  on(UserDeletingFailed, (state) => ({ ...state, users: { ...state.users, readiness: Readiness.Error } }))
);
