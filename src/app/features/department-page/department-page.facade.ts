import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  DepartmentDeletingStarted,
  DepartmentEditSelected,
  DepartmentEditSelectedClear,
  DepartmentModificationStarted,
  DepartmentSelected,
  DepartmentSelectedClear,
  DepartmentsLoadingStarted,
} from '../../core/store/departments/departments.actions';
import {
  selectDepartments,
  selectDepartmentsReadiness,
  selectEditDepartment,
  selectSelectedDepartment,
} from '../../core/store/departments/departments.selectors';
import {
  UserDeletingStarted,
  UserEditSelected,
  UserEditSelectedClear,
  UsersLoadingStarted,
  UsersModificationStarted,
} from '../../core/store/users/users.actions';
import { selectDepartmentUsers, selectEditUser, selectUsersReadiness } from '../../core/store/users/users.selectors';
import { isNotNull } from '../../core/utils/object';
import { DepartmentModel } from '../../models/department.model';
import { UserModel, UserModifyModel } from '../../models/user.model';
import { combineLatest, map } from 'rxjs';
import { Readiness } from '../../core/models/readiness.model';

@Injectable()
export class DepartmentPageFacade {
  public departmentsViewModel$ = this.store.select(selectDepartments);
  public usersViewModel$ = this.store.select(selectDepartmentUsers);

  public isDatabaseError$ = combineLatest([this.store.select(selectUsersReadiness), this.store.select(selectDepartmentsReadiness)]).pipe(
    map(([usersReady, departmentsReady]) => usersReady === Readiness.Error || departmentsReady === Readiness.Error)
  );

  public editDepartment$ = this.store.select(selectEditDepartment);
  public editUser$ = this.store.select(selectEditUser);

  public selectedDepartment$ = this.store.select(selectSelectedDepartment);

  public constructor(private store: Store) {}

  // DEPARTMENTS
  public loadDepartments(): void {
    this.store.dispatch(DepartmentsLoadingStarted());
  }

  public saveDepartment(name: string): void {
    this.store.dispatch(DepartmentModificationStarted({ name }));
  }

  public updateEditDepartmentState(department: DepartmentModel | null) {
    if (isNotNull(department)) {
      this.store.dispatch(DepartmentEditSelected({ department }));
      return;
    }
    this.store.dispatch(DepartmentEditSelectedClear());
  }

  public deleteDepartment(department: DepartmentModel) {
    this.store.dispatch(DepartmentDeletingStarted({ department }));
  }

  public selectDepartment(department: DepartmentModel) {
    this.store.dispatch(DepartmentSelected({ department }));
  }

  public unSelectDepartment() {
    this.store.dispatch(DepartmentSelectedClear());
  }

  // USERS
  public loadUsers(): void {
    this.store.dispatch(UsersLoadingStarted());
  }

  public saveUser(user: UserModifyModel): void {
    this.store.dispatch(UsersModificationStarted({ user }));
  }

  public updateEditUserState(user: UserModel | null) {
    if (isNotNull(user)) {
      this.store.dispatch(UserEditSelected({ user }));
      return;
    }
    this.store.dispatch(UserEditSelectedClear());
  }

  public deleteUser(user: UserModel) {
    this.store.dispatch(UserDeletingStarted({ user }));
  }
}
