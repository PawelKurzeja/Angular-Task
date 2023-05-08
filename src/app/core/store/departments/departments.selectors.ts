import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentsState } from './departments.state';

export const selectDepartmentsState = createFeatureSelector<DepartmentsState>('departments');

export const selectDepartments = createSelector(selectDepartmentsState, (state) => state.departments);

export const selectDepartmentsReadiness = createSelector(selectDepartmentsState, (state) => state.departments.readiness);

export const selectEditDepartment = createSelector(selectDepartmentsState, (state) => state.editDepartment);

export const selectSelectedDepartment = createSelector(selectDepartmentsState, (state) => state.selectedDepartment);
