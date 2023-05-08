import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Subject } from 'rxjs';
import { isDepartmentModel } from '../../models/department.model';
import { PrimeTableComponent, TableColumn, TableData } from '../prime-table/prime-table.component';
import { DepartmentDialogComponent } from './department-dialog/department-dialog.component';
import { DepartmentPageFacade } from './department-page.facade';
import { UserModel, UserBaseModel, isUserModel, UserModifyModel } from '../../models/user.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { isNotNull, isNull } from '../../core/utils/object';
import { Readiness } from '../../core/models/readiness.model';

enum DepartmentTableColumns {
  Name = 'name',
  Id = 'id',
}

enum UserTableColumns {
  Name = 'name',
  Id = 'id',
  Email = 'email',
}

@Component({
  selector: 'app-department-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, PrimeTableComponent, DepartmentDialogComponent, UserDialogComponent, ProgressSpinnerModule],
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.scss'],
  providers: [DepartmentPageFacade],
})
export class DepartmentPageComponent implements OnInit {
  departmentsVm$ = this.departmentPageFacade.departmentsViewModel$;
  usersVm$ = this.departmentPageFacade.usersViewModel$;
  selectedDepartment$ = this.departmentPageFacade.selectedDepartment$;
  isDatabaseError$ = this.departmentPageFacade.isDatabaseError$;

  showDepartmentDialog$: Subject<boolean> = new Subject<boolean>();
  showUserDialog$: Subject<boolean> = new Subject<boolean>();

  isNull = isNull;
  isNotNull = isNotNull;
  Readiness = Readiness;

  departmentTableColumns: TableColumn[] = [
    {
      field: DepartmentTableColumns.Name,
      header: `Name`,
    },
    {
      field: DepartmentTableColumns.Id,
      header: `ID`,
    },
  ];

  userTableColumns: TableColumn[] = [
    {
      field: UserTableColumns.Name,
      header: `Name`,
    },
    {
      field: UserTableColumns.Email,
      header: `Email`,
    },
    {
      field: UserTableColumns.Id,
      header: `ID`,
    },
  ];

  ngOnInit() {
    this.departmentPageFacade.loadDepartments();
    this.departmentPageFacade.loadUsers();
  }

  // DEPARTMENTS
  onAddDepartmentClick() {
    this.departmentPageFacade.updateEditDepartmentState(null);
    this.showDepartmentDialog$.next(true);
  }

  onDepartmentSave(name: string) {
    this.departmentPageFacade.saveDepartment(name);
  }

  onEditDepartment(department: TableData) {
    if (isDepartmentModel(department)) {
      this.departmentPageFacade.updateEditDepartmentState(department);
      this.showDepartmentDialog$.next(true);
    }
  }

  onRemoveDepartment(department: TableData) {
    if (isDepartmentModel(department)) {
      this.departmentPageFacade.deleteDepartment(department);
    }
  }

  onSelectDepartment(department: TableData) {
    if (isDepartmentModel(department)) {
      this.departmentPageFacade.selectDepartment(department);
    }
  }

  onUnSelectDepartment() {
    this.departmentPageFacade.unSelectDepartment();
  }

  // USERS
  onAddUserClick() {
    this.departmentPageFacade.updateEditUserState(null);
    this.showUserDialog$.next(true);
  }

  onUserSave(user: UserModifyModel) {
    this.departmentPageFacade.saveUser(user);
  }

  onEditUser(user: TableData) {
    if (isUserModel(user)) {
      this.departmentPageFacade.updateEditUserState(user);
      this.showUserDialog$.next(true);
    }
  }

  onRemoveUser(user: TableData) {
    if (isUserModel(user)) {
      this.departmentPageFacade.deleteUser(user);
    }
  }

  constructor(private readonly departmentPageFacade: DepartmentPageFacade) {}
}
