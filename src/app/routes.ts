import { Routes } from '@angular/router';

const routeConfig: Routes = [
  {
    path: '',
    title: 'Department page',
    loadComponent: () => import('./features/department-page/department-page.component').then((m) => m.DepartmentPageComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default routeConfig;
