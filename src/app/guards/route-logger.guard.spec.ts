import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { routeLoggerGuard } from './route-logger.guard';

describe('routeLoggerGuard', () => {
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule;
    router = TestBed.inject(Router);
  });

  // TEST 1: El guard siempre retorna true
  it('deberia siempre retornar true', () => {
    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = { url: '/test' } as RouterStateSnapshot;

    const result = routeLoggerGuard(mockRoute, mockState);
    expect(result).toBe(true);
  });

  // TEST 2: El guard funciona con la ruta raíz
  it('deberia permitir el acceso a la ruta', () => {
    const mockRoute = { params: {} } as any;
    const mockState = { url: '/' } as RouterStateSnapshot;

    const result = routeLoggerGuard(mockRoute, mockState);
    expect(result).toBe(true);
  });

  // TEST 4: Verificar que console.log se ejecute
  it('denberia llamar el console.log', () => {
    spyOn(console, 'log');
    
    const mockRoute = { params: {} } as any;
    const mockState = { url: '/test' } as RouterStateSnapshot;

    routeLoggerGuard(mockRoute, mockState);
    
    expect(console.log).toHaveBeenCalled();
  });
});