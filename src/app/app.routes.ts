import { Routes } from '@angular/router';
import { routeLoggerGuard } from './guards/route-logger.guard';

const routes: Routes = [
  {
    path:'',
    loadComponent: () => import('./components/lista-employees/lista-employees.component'),
    canActivate: [routeLoggerGuard]
  },
  {
    path:'new',
    loadComponent:()=>import('./components/employees-form/employees-form.component'),
    canActivate: [routeLoggerGuard]

  },
  {
    path: ':id/edit',
    loadComponent:() => import('./components/employees-form-editar/employees-form-editar.component'),
    canActivate: [routeLoggerGuard]

  },
  {
    path:'**',
    redirectTo:''
  }

];
export{routes};
