import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, Subscription, filter } from 'rxjs';
import { isNotNull, isNotNullOrUndefined, isNull } from '../../../core/utils/object';
import { DepartmentModel } from '../../../models/department.model';
import { UserModifyModel } from '../../../models/user.model';
import { DepartmentPageFacade } from '../department-page.facade';

interface UserForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  department: FormControl<DepartmentModel | null>;
}

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnDestroy {
  @Output()
  save = new EventEmitter<UserModifyModel>();

  @Input()
  public dialogVisible$: Subject<boolean> = new Subject<boolean>();

  isNull = isNull;

  editUser$ = this.departmentPageFacade.editUser$;
  selectedDepartment$ = this.departmentPageFacade.selectedDepartment$;
  departments$ = this.departmentPageFacade.departmentsViewModel$;

  userForm: FormGroup<UserForm>;

  subscriptions: Subscription[] = [];

  constructor(private readonly departmentPageFacade: DepartmentPageFacade) {
    this.userForm = new FormGroup<UserForm>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy() {
    this.departmentPageFacade.updateEditUserState(null);
    this.resetSubscriptions();
  }

  saveUser() {
    const user = this.userForm.value;
    if (isNotNullOrUndefined(user.email) && isNotNullOrUndefined(user.name) && isNotNullOrUndefined(user.department)) {
      this.save.emit({ name: user.name, email: user.email, department: user.department });
      this.hideDialog();
    }
  }

  hideDialog() {
    this.userForm.reset();
    this.dialogVisible$.next(false);
    this.resetSubscriptions();
  }

  showDialog() {
    this.subscriptions.push(
      this.editUser$.pipe(filter(isNotNull)).subscribe((user) => this.userForm.patchValue({ name: user.name, email: user.email })),
      this.selectedDepartment$.pipe(filter(isNotNull)).subscribe((department) => {
        this.userForm.patchValue({ department });
      })
    );
  }

  resetSubscriptions() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
