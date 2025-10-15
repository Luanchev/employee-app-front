import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
    
  });

  afterEach(() => {
    httpMock.verify();
  });

  //Verificar que el servicio se crea
  it('se crea el servicio', () => {
    expect(service).toBeTruthy();
  });

  // Listar empleados
   it('deberia traer todos los empleados', (done) => {
    service.list().subscribe(employees => {
      expect(employees.length).toBe(5); 
      expect(employees[0].name).toBe('Juan');
      done();
    });
  });

  // Obtener empleado por cédula
  it('deberia traer un empleado por cedula', (done) => {
    service.getbyCedula('1234567890').subscribe(response => {
      expect(response.data).toBeDefined();
      expect(response.data.cedula).toBe('1234567890');
      done();
    });
  });

  // Crear empleado
  it('deberia crear un nuevo empleado', (done) => {
    const newEmployee = {
      name: 'Carlos',
      surname: 'Rodríguez',
      cedula: '5555555555',
      address: 'Avenida 68',
      telephone: '3205556677',
      photo: 'url'
    };

    service.create(newEmployee).subscribe(createdEmployee => {
      expect(createdEmployee.name).toBe('Carlos');
      expect(createdEmployee.id).toBeDefined();
      expect(createdEmployee.active).toBe(true);
      done();
    });
  });

  // Actualizar empleado
  it('deberia editar un nuevo empleado', (done) => {
    const updatedEmployee = {
      name: 'Juan Modificado',
      surname: 'Pérez',
      cedula: '1234567890',
      address: 'Nueva Dirección',
      telephone: '3001234567',
      photo: 'url'
    };

    service.update(1, updatedEmployee).subscribe(employee => {
      expect(employee.name).toBe('Juan Modificado');
      expect(employee.address).toBe('Nueva Dirección');
      done();
    });
  });

  // Cambiar estado activo/inactivo
  it('deberia cambiar el estado del empleado', (done) => {
  // Se desactiva
  service.toggleActive(1, false).subscribe(employee => {
    expect(employee.active).toBeFalse();

    //Lo vuelve a activar
    service.toggleActive(2, true).subscribe(employee2 => {
      expect(employee2.active).toBeTrue();
      done(); 
    });
  });
});

  // Verificar que employeeAdded$ emita eventos
  it('deberia emitir el evento cuando se crea un empleado', (done) => {
    const newEmployee = {
      name: 'Ana',
      surname: 'Martínez',
      cedula: '1111222233',
      address: 'Transversal 10',
      telephone: '3151112233',
      photo: 'url'
    };

    service.employeeAdded$.subscribe(employee => {
      expect(employee.name).toBe('Ana');
      done();
    });

    service.create(newEmployee).subscribe();
  });

  // Verificar que employeeUpdated$ emita eventos
  it('deberia emitir el evento cuando se edita un empleado', (done) => {
    const updatedEmployee = {
      name: 'Juan Actualizado',
      surname: 'Pérez',
      cedula: '1234567890',
      address: 'Dirección',
      telephone: '3001234567',
      photo: 'url'
    };

    service.employeeUpdated$.subscribe(employee => {
      expect(employee.name).toBe('Juan Actualizado');
      done();
    });

    service.update(1, updatedEmployee).subscribe();
  });

  // Verificar que employeeStatusChanged$ emita eventos
  it('deberia emitir employeeStatusChanged event correctamente', (done) => {
    service.employeeStatusChanged$.subscribe(employee => {
      expect(employee.active).toBe(false);
      done();
    });

    service.toggleActive(1, false).subscribe();
  });
});