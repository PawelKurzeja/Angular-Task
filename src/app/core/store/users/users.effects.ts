import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { DepartmentApiService } from '../../../api/department-api.service';
import { UserApiService } from '../../../api/user-api.service';
import { isNotNull } from '../../utils/object';
import { DepartmentCustomModifyOnUserCreation } from '../departments/departments.actions';
import {
  UserCreatingFailed,
  UserCreatingSucceeded,
  UserDeletingFailed,
  UserDeletingStarted,
  UserDeletingSucceeded,
  UserEditingFailed,
  UserEditingSucceeded,
  UsersLoadingFailed,
  UsersLoadingStarted,
  UsersLoadingSucceeded,
  UsersModificationStarted,
} from './users.actions';
import { selectEditUser } from './users.selectors';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersLoadingStarted),
      switchMap(() =>
        this.userApiService.getUsers().pipe(
          map(
            (users) => UsersLoadingSucceeded({ users }),
            catchError((error) => of(UsersLoadingFailed({ error })))
          )
        )
      )
    )
  );
  saveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersModificationStarted),
      concatLatestFrom(() => this.store.select(selectEditUser)),
      switchMap(([action, user]) => {
        if (user) {
          return this.userApiService.updateUserById({ id: user.id, name: action.user.name, email: action.user.email }).pipe(
            filter(isNotNull),
            tap((user) => {
              this.store.dispatch(
                DepartmentCustomModifyOnUserCreation({
                  departmentId: action.user.department.id,
                  user: { name: action.user.name, id: user.id, email: action.user.email },
                })
              );
            }),
            map((user) => UserEditingSucceeded({ user })),
            catchError((error) => of(UserEditingFailed({ error })))
          );
        } else {
          return this.userApiService.createUser(action.user).pipe(
            filter(isNotNull),
            tap((user) => {
              this.store.dispatch(
                DepartmentCustomModifyOnUserCreation({
                  departmentId: action.user.department.id,
                  user: { name: action.user.name, id: user.id, email: action.user.email },
                })
              );
            }),
            map((user) => UserCreatingSucceeded({ user })),
            catchError((error) => of(UserCreatingFailed({ error })))
          );
        }
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDeletingStarted),
      switchMap((action) =>
        this.userApiService.deleteUserById(action.user).pipe(
          filter(isNotNull),
          map((user) => UserDeletingSucceeded({ user })),
          catchError((error) => of(UserDeletingFailed({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService,
    private departmentApiService: DepartmentApiService,
    private store: Store
  ) {}
}
