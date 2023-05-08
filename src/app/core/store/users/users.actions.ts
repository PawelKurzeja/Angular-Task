import { createAction, props } from '@ngrx/store';
import { UserModel, UserModifyModel } from '../../../models/user.model';

const prefix = `[Users]`;

// Users get
export const UsersLoadingStarted = createAction(`${prefix} Users loading started`);
export const UsersLoadingSucceeded = createAction(`${prefix} Users loading started succeeded`, props<{ users: UserModel[] }>());
export const UsersLoadingFailed = createAction(`${prefix} Users loading started failed`, props<{ error: unknown }>());

// Users modify
export const UsersModificationStarted = createAction(`${prefix} Users modification started`, props<{ user: UserModifyModel }>());

// User create
export const UserCreatingStarted = createAction(`${prefix} User creating started`, props<{ user: Partial<UserModel> }>());
export const UserCreatingSucceeded = createAction(`${prefix} User creating succeeded`, props<{ user: UserModel }>());
export const UserCreatingFailed = createAction(`${prefix} User creating failed`, props<{ error: unknown }>());

// User edit
export const UserEditSelected = createAction(`${prefix} User edit selected`, props<{ user: UserModel }>());
export const UserEditSelectedClear = createAction(`${prefix} User edit select cleared`);

export const UserEditingStarted = createAction(`${prefix} User editing started`, props<{ user: UserModel }>());
export const UserEditingSucceeded = createAction(`${prefix} User editing succeeded`, props<{ user: UserModel }>());
export const UserEditingFailed = createAction(`${prefix} User editing failed`, props<{ error: unknown }>());

// User delete
export const UserDeletingStarted = createAction(`${prefix} User deleting started`, props<{ user: UserModel }>());
export const UserDeletingSucceeded = createAction(`${prefix} User deleting succeeded`, props<{ user: UserModel }>());
export const UserDeletingFailed = createAction(`${prefix} User deleting failed`, props<{ error: unknown }>());
