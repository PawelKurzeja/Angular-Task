import { DepartmentModel } from '../../../models/department.model';
import { Readiness } from '../../models/readiness.model';

export interface DepartmentsState {
  departments: {
    records: DepartmentModel[];
    readiness: Readiness;
  };
  editDepartment: DepartmentModel | null;
  selectedDepartment: DepartmentModel | null;
}

export const initialDepartmentsState: DepartmentsState = {
  departments: {
    records: [],
    readiness: Readiness.Initial,
  },
  editDepartment: null,
  selectedDepartment: null,
};
