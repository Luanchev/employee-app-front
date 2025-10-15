import { EmployeeStatusPipe } from './employee-status.pipe';

describe('EmployeeStatusPipe', () => {
  let pipe: EmployeeStatusPipe;

  beforeEach(() => {
    pipe = new EmployeeStatusPipe();
  });

  // TEST 1: El pipe se crea
  it('deberia crear la instancia del pipe correctamente', () => {
    expect(pipe).toBeTruthy();
  });

  // TEST 2: Retornar  "Activo" cuando sea true
  it('deberia retornar "Activo" si el empleado esta en false', () => {
    const result = pipe.transform(true);
    expect(result).toBe('Activo');
  });

  // TEST 3: Retornar "Inactivo" cuando sea false
  it('deberia retornar "Inactivo" si el empleado esta en false', () => {
    const result = pipe.transform(false);
    expect(result).toBe('Inactivo');
  });

  // TEST 4: Manejar valores nulos
  it('probamos que funcione con valores null', () => {
    const result = pipe.transform(null as any);
    expect(result).toBe('Inactivo');
  });

  // TEST 5: Manejar valores undefined
  it('probamos que funcione con valores undefined', () => {
    const result = pipe.transform(undefined as any);
    expect(result).toBe('Inactivo');
  });
});