import { CommonModule, DatePipe } from '@angular/common';
import { Component,OnDestroy,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../../services/employee.service';
import { HighlightHoverDirective } from '../../directives/highlight-hover.directive';
import { EmployeeStatusPipe } from '../../pipes/employee-status.pipe';

@Component({
  selector: 'app-lista-employees',
  standalone: true,
  imports: [ CommonModule, RouterModule, FormsModule, EmployeeStatusPipe, HighlightHoverDirective, ReactiveFormsModule],
  templateUrl: './lista-employees.component.html'
})
export default class ListaEmployeesComponent implements OnInit, OnDestroy  {

  constructor(private employeeService: EmployeeService){
    console.log("ListaEmployeesComponent - Constructor ejecutado");
  }

  employees: any[] = [];
  filteredEmployees: any[] = [];
  searchCedulaControl = new FormControl('');
  edit = "/edit";

  private subscriptions: Subscription[] = [];


  ngOnInit(): void {
    console.log('ListaEmployeesComponent - ngOnInit: Componente inicializado');
    console.log('Hora de inicialización:', new Date().toLocaleTimeString());
    this.loadEmployees();
    this.subscribeToEmployeeChanges();
    
    this.subscriptions.push(
      this.searchCedulaControl.valueChanges.subscribe(() => {
        this.filterByCedula();
      })
    );
  }
  ngOnDestroy(): void {
    console.log('ListaEmployeesComponent - ngOnDestroy: Componente destruido');
    console.log('Hora de destrucción:', new Date().toLocaleTimeString());
    //limpiamos las subscripciones
    this.subscriptions.forEach(sub => sub.unsubscribe());
    console.log('Suscripciones limpiadas');
  }
  subscribeToEmployeeChanges(): void {
    // Escuchar cuando se agrega un empleado
    const addedSub = this.employeeService.employeeAdded$.subscribe({
      next: (newEmployee) => {
        console.log('NOTIFICACIÓN RECIBIDA: Nuevo empleado agregado', newEmployee);
        // Solo agregar el empleado a la lista actual
        this.employees.push(newEmployee);
        this.filteredEmployees = [...this.employees];
        console.log(`Empleado ${newEmployee.name} agregado a la lista`);
      },
      error: (error) => {
        console.error('Error en suscripción employeeAdded$:', error);
      }
    });
  
  const updatedSub = this.employeeService.employeeUpdated$.subscribe({
      next: (updatedEmployee) => {
        console.log('NOTIFICACIÓN RECIBIDA: Empleado actualizado', updatedEmployee);
        // Actualizar el empleado en la lista local
        const index = this.employees.findIndex(emp => emp.id === updatedEmployee.id);
        if (index !== -1) {
          this.employees[index] = updatedEmployee;
          this.filteredEmployees = [...this.employees];
          console.log(`Empleado ${updatedEmployee.name} actualizado en la lista`);
        }
      },
      error: (error) => {
        console.error('Error en suscripción employeeUpdated$:', error);
      }
    });

    // Escuchar cuando cambia el estado de un empleado
    const statusSub = this.employeeService.employeeStatusChanged$.subscribe({
      next: (employee) => {
        console.log('NOTIFICACIÓN RECIBIDA: Estado cambiado', employee);
        const status = employee.active ? 'activado' : 'desactivado';
        console.log(`Empleado ${employee.name} ${status}`);
        // El estado ya se actualiza localmente en toggleActive()
      },
      error: (error) => {
        console.error('Error en suscripción employeeStatusChanged$:', error);
      }
    });

    // Guardar suscripciones para limpiarlas después
    this.subscriptions.push(addedSub, updatedSub, statusSub);
  }

  loadEmployees(): void {
    this.employeeService.list().subscribe({
      next: (employees: any) => {
        this.employees = employees;
        this.filteredEmployees = employees;
        console.log('Empleados cargados:', this.employees.length, 'empleados');
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }

  filterByCedula(): void {
    const cedula = this.searchCedulaControl.value;
    if (cedula) {
      this.employeeService.getbyCedula(cedula).subscribe({
        next: (response: any) => {
          console.log('Búsqueda por cédula:', cedula);
          const filteredEmployee = response.data;
          if (filteredEmployee) {
            this.filteredEmployees = [filteredEmployee];
            console.log('Empleado encontrado:', filteredEmployee.name);
          } else {
            this.filteredEmployees = [];
            console.log('No se encontró empleado con esa cédula');
          }
        },
        error: (error) => {
          console.error('Error al buscar por cédula:', error);
        }
      });
    } else {
      this.filteredEmployees = [...this.employees];
    }
  }
toggleActive(employee: any): void {
    const newStatus = !employee.active; // Invertir el estado actual
    
    this.employeeService.toggleActive(employee.id, newStatus).subscribe(() => {
      employee.active = newStatus; // Actualizar localmente
      console.log(`Empleado ${employee.name} ahora está ${newStatus ? 'ACTIVO' : 'INACTIVO'}`);
    }, error => {
      console.error('Error al cambiar estado:', error);
    });
  }


}
