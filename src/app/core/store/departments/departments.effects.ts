import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { DepartmentApiService } from '../../../api/department-api.service';
import { isNotNull } from '../../utils/object';
import {
  DepartmentCreatingSucceeded,
  DepartmentDeletingFailed,
  DepartmentDeletingStarted,
  DepartmentDeletingSucceeded,
  DepartmentEditingFailed,
  DepartmentEditingSucceeded,
  DepartmentsLoadingFailed,
  DepartmentsLoadingStarted,
  DepartmentsLoadingSucceeded,
  DepartmentModificationStarted,
} from './departments.actions';
import { selectEditDepartment } from './departments.selectors';

@Injectable()
export class DepartmentsEffects {
  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentsLoadingStarted),
      switchMap(() =>
        this.departmentApiService.getDepartments().pipe(
          map(
            (departments) => DepartmentsLoadingSucceeded({ departments }),
            catchError((error) => of(DepartmentsLoadingFailed({ error })))
          )
        )
      )
    )
  );

  saveDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentModificationStarted),
      concatLatestFrom(() => this.store.select(selectEditDepartment)),
      switchMap(([action, department]) => {
        if (department) {
          return this.departmentApiService.updateDepartmentById({ ...department, name: action.name }).pipe(
            filter(isNotNull),
            map((department) => DepartmentEditingSucceeded({ department })),
            catchError((error) => of(DepartmentEditingFailed({ error })))
          );
        } else {
          return this.departmentApiService.createDepartment(action.name).pipe(
            filter(isNotNull),
            map((department) => DepartmentCreatingSucceeded({ department: { ...department, users: [] } })),
            catchError((error) => of(DepartmentsLoadingFailed({ error })))
          );
        }
      })
    )
  );

  deleteDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DepartmentDeletingStarted),
      switchMap((action) =>
        this.departmentApiService.deleteDepartmentById(action.department).pipe(
          filter(isNotNull),
          map((department) => DepartmentDeletingSucceeded({ department })),
          catchError((error) => of(DepartmentDeletingFailed({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private departmentApiService: DepartmentApiService, private store: Store) {}
}
