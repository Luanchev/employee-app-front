import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';

export const httpConfigInterceptor: HttpInterceptorFn = (req, next) => {
  
 
  console.log('═══════════════════════════════════════');
  console.log('HTTP REQUEST');
  console.log('Método:', req.method);
  console.log('URL:', req.url);
  console.log('Hora:', new Date().toLocaleTimeString());
  console.log('═══════════════════════════════════════');

 
  const modifiedReq = req.clone({
    setHeaders: {
      'X-Custom-Header': 'EmployeeManagementApp',
      'X-Request-Time': new Date().toISOString(),
      'X-App-Version': '1.0.0'
    }
  });

  // Enviar la petición modificada
  return next(modifiedReq).pipe(
    // LOG: Respuesta exitosa
    tap(response => {
      console.log('═══════════════════════════════════════');
      console.log('✅ HTTP RESPONSE SUCCESS');
      console.log('Status: OK');
      console.log('URL:', req.url);
      console.log('═══════════════════════════════════════');
    }),
    
    //  Manejo de errores global
    catchError((error: HttpErrorResponse) => {
      console.error('═══════════════════════════════════════');
      console.error(' HTTP ERROR');
      console.error('Status:', error.status);
      console.error('URL:', req.url);
      console.error('Mensaje:', error.message);
      console.error('Error completo:', error);
      console.error('═══════════════════════════════════════');
      
      // Mensaje amigable según el tipo de error
      let errorMessage = 'Ocurrió un error en la petición';
      
      if (error.status === 0) {
        errorMessage = 'No hay conexión con el servidor';
      } else if (error.status === 404) {
        errorMessage = 'Recurso no encontrado (404)';
      } else if (error.status === 500) {
        errorMessage = 'Error interno del servidor (500)';
      } else if (error.status === 401) {
        errorMessage = 'No autorizado (401)';
      } else if (error.status === 403) {
        errorMessage = 'Acceso prohibido (403)';
      }
      
      console.error('Mensaje amigable:', errorMessage);
      
      return throwError(() => error);
    })
  );
};