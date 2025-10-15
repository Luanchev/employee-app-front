import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private employeeAddedSubject = new Subject<any>();
  employeeAdded$ = this.employeeAddedSubject.asObservable(); 

  private employeeUpdatedSubject = new Subject<any>();
  employeeUpdated$ = this.employeeUpdatedSubject.asObservable();

  private employeeStatusChangedSubject = new Subject<any>();
  employeeStatusChanged$ = this.employeeStatusChangedSubject.asObservable();

  private mockEmployees = [
    {
      id: 1,
      name: 'Juan',
      surname: 'Pérez',
      cedula: '1234567890',
      address: 'Calle 123 #45-67',
      telephone: '3001234567',
      photo: 'https://i.pravatar.cc/150?img=1',
      active: true
    },
    {
      id: 2,
      name: 'María',
      surname: 'González',
      cedula: '9876543210',
      address: 'Carrera 45 #12-34',
      telephone: '3109876543',
      photo: 'https://i.pravatar.cc/150?img=5',
      active: true
    },
    {
      id: 3,
      name: 'Carlos',
      surname: 'Rodríguez',
      cedula: '5555555555',
      address: 'Avenida 68 #23-45',
      telephone: '3205556677',
      photo: 'https://i.pravatar.cc/150?img=12',
      active: false
    },
    {
      id: 4,
      name: 'Ana',
      surname: 'Martínez',
      cedula: '1111222233',
      address: 'Transversal 10 #5-20',
      telephone: '3151112233',
      photo: 'https://i.pravatar.cc/150?img=9',
      active: true
    },
    {
      id: 5,
      name: 'Luis',
      surname: 'Fernández',
      cedula: '9999888877',
      address: 'Diagonal 30 #15-40',
      telephone: '3009998888',
      photo: 'https://i.pravatar.cc/150?img=15',
      active: false
    }
  ];

  list(): Observable<any> {
    console.log('Retornando datos de prueba (mock)');
    return of(this.mockEmployees);
  }

  get(id: number): Observable<any> {
    const employee = this.mockEmployees.find(emp => emp.id === id);
    console.log('Buscando empleado por ID:', id, employee);
    return of(employee);
  }

  getbyCedula(cedula: string): Observable<any> {
    const employee = this.mockEmployees.find(emp => emp.cedula === cedula);
    console.log('Buscando empleado por cédula:', cedula, employee);
    return of({ data: employee });
  }

  create(employee: any): Observable<any> {
    const newEmployee = {
      ...employee,
      id: this.mockEmployees.length + 1,
      active: true // Por defecto activo
    };
    this.mockEmployees.push(newEmployee);
    console.log('Empleado creado:', newEmployee);
    this.employeeAddedSubject.next(newEmployee);
    console.log('Notificación enviada: Nuevo empleado agregado');
    return of(newEmployee);
  }

  update(id: number, employee: any): Observable<any> {
    const index = this.mockEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.mockEmployees[index] = { ...this.mockEmployees[index], ...employee };
      console.log('Empleado actualizado:', this.mockEmployees[index]);
      this.employeeUpdatedSubject.next(this.mockEmployees[index]);
      //se realiza la notificación de actualización
      console.log('Notificación enviada: Empleado actualizado');
      return of(this.mockEmployees[index]);
    }

    return of(null);
  }

  toggleActive(id: number, active: boolean): Observable<any> {
    const employee = this.mockEmployees.find(emp => emp.id === id);
    if (employee) {
      employee.active = active;
      console.log(`Estado cambiado: Empleado ${employee.name} ahora está ${active ? 'ACTIVO' : 'INACTIVO'}`);
      //se notifica la actualización del estado
      this.employeeStatusChangedSubject.next(employee);
      console.log('Notificación enviada: Estado cambiado');
      return of(employee);
    }
    return of(null);
  }

  /*
  list(){
    return this.http.get('http://localhost:8080/api/v1/employee');
  }
  get(id: number){
    return this.http.get(`http://localhost:8080/api/v1/employee/getById/${id}`);
  }

  getbyCedula(cedula: string){
    return this.http.get(`http://localhost:8080/api/v1/employee/getByCedula/${cedula}`);
  }

  create(employee: any){
    return this.http.post(`http://localhost:8080/api/v1/employee/registrarEmpleado/`, employee);

  }
  update(id: number, employee: any){
    return this.http.put(`http://localhost:8080/api/v1/employee/actualizarEmpleado/${id}`, employee);
  }
  toggleActive(id: number, active: boolean){
    return this.http.patch(`http://localhost:8080/api/v1/employee/actualizarEstado/${id}`, { active });
  }
    */



}
