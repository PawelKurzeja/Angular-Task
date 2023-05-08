import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, Subscription, filter } from 'rxjs';
import { isNotNull } from '../../../core/utils/object';
import { DepartmentPageFacade } from '../department-page.facade';

interface DepartmentForm {
  name: FormControl<string | null>;
}

@Component({
  selector: 'app-department-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './department-dialog.component.html',
  styleUrls: ['./department-dialog.component.scss'],
})
export class DepartmentDialogComponent implements OnDestroy {
  @Output()
  save = new EventEmitter<string>();

  @Input()
  public dialogVisible$: Subject<boolean> = new Subject<boolean>();

  editDepartment$ = this.departmentPageFacade.editDepartment$;

  departmentForm: FormGroup<DepartmentForm>;

  subscriptions: Subscription[] = [];

  constructor(private readonly departmentPageFacade: DepartmentPageFacade) {
    this.departmentForm = new FormGroup<DepartmentForm>({
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy() {
    this.departmentPageFacade.updateEditDepartmentState(null);
    this.resetSubscriptions();
  }

  saveDepartment() {
    const departmentName = this.departmentForm.value;
    if (departmentName.name) {
      this.save.emit(departmentName.name);
      this.hideDialog();
    }
  }

  hideDialog() {
    this.departmentForm.reset();
    this.dialogVisible$.next(false);
  }

  showDialog() {
    this.subscriptions.push(
      this.editDepartment$.pipe(filter(isNotNull)).subscribe((department) => this.departmentForm.patchValue({ name: department.name }))
    );
  }

  resetSubscriptions() {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
