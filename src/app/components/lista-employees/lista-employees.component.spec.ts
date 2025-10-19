import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import ListaEmployeesComponent from '../lista-employees/lista-employees.component';
import { EmployeeService } from '../../../services/employee.service';

describe('ListaEmployeesComponent', () => {
  let component: ListaEmployeesComponent;
  let fixture: ComponentFixture<ListaEmployeesComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListaEmployeesComponent,
        HttpClientTestingModule,  
        RouterTestingModule
      ],
      providers: [EmployeeService] 
    }).compileComponents();

    fixture = TestBed.createComponent(ListaEmployeesComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
  });

  it('deberia crear el componente de manera exitosa', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cargar los empleados ficticios correctamente', () => {
    const mockEmployees = [
      { id: 1, name: 'Juan', active: true },
      { id: 2, name: 'María', active: false }
    ];

    spyOn(employeeService, 'list').and.returnValue(of(mockEmployees));

    component.ngOnInit();

    expect(component.employees.length).toBe(2);
    expect(component.filteredEmployees.length).toBe(2);
    expect(employeeService.list).toHaveBeenCalled();
  });

  it('deberia filtrar correctamente por cedula', () => {
    const mockEmployee = { id: 1, name: 'Juan', cedula: '1234567890' };
    
    spyOn(employeeService, 'getbyCedula').and.returnValue(
      of({ data: mockEmployee })
    );

    component.searchCedulaControl.setValue('1234567890')
    component.filterByCedula();

    expect(component.filteredEmployees.length).toBe(1);
    expect(component.filteredEmployees[0].name).toBe('Juan');
  });

  it('deberia cambiar el empleado a inactive', () => {
    const employee = { id: 1, name: 'Juan', active: true };
    
    spyOn(employeeService, 'toggleActive').and.returnValue(of(employee));

    component.toggleActive(employee);

    expect(employee.active).toBe(false);
  });

  it('deberia de manejar array vacio', () => {
    spyOn(employeeService, 'list').and.returnValue(of([]));

    component.ngOnInit();

    expect(component.employees.length).toBe(0);
    expect(component.filteredEmployees.length).toBe(0);
  });

  it('deberia ejecutar el unsubscrice sin error', () => {
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});