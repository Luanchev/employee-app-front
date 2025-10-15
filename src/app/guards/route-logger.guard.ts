import { CanActivateFn } from '@angular/router';

export const routeLoggerGuard: CanActivateFn = (route, state) => {
  
  // Mostrar en consola la ruta en la cual se entra
  console.log('════════════════════════════════════');
  console.log('ENTRANDO A LA RUTA:', state.url);
  console.log('Parámetros de la ruta:', route.params);
  console.log('Fecha y hora:', new Date().toLocaleString());
  console.log('════════════════════════════════════');
  
  // Retornamos siempre true para permitir el acceso
  return true;
};