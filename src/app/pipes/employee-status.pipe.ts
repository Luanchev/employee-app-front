import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'employeeStatus',
  standalone: true
})
export class EmployeeStatusPipe implements PipeTransform {

  transform(active: boolean): string {
    return active ? 'Activo' : 'Inactivo';
  }

}