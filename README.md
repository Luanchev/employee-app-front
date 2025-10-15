# Employee Management System
Sistema de gestión de empleados desarrollado con Angular 17+, diseñado con buenas prácticas de desarrollo, testing y containerización.
Descripción del Proyecto
Esta aplicación permite gestionar información de empleados con funcionalidades como:

-Listar empleados
-Crear nuevos empleados
-Editar información de empleados
-Marcar empleados como activos o inactivos
-Buscar empleados por cédula
-Validación avanzada de formularios

# Tecnologías Utilizadas
Frontend

Angular 17+ - Framework principal
TypeScript - Lenguaje de programación
RxJS - Programación reactiva
Bootstrap
Reactive Forms - Formularios avanzados

# Testing

Jasmine - Framework de testing
Karma - Test runner
Angular Testing Utilities - Herramientas de prueba

# DevOps

Docker - Containerización
Nginx - Servidor web

# Herramientas de Desarrollo

Angular CLI - Herramienta de línea de comandos
Node.js 18+ - Runtime de JavaScript
npm - Gestor de paquetes

# Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:

Node.js 18+ 
npm 9+ 
Angular CLI 17+ 
Docker 

Verifica las versiones:
node --version   # v18.x.x o superior
npm --version    # 9.x.x o superior
ng version       # @angular/cli: 17.x.x o superior

# Instalación
1. Clonar el repositorio
    git clone <url-del-repositorio>
    cd employees-app
2. Instalar dependencias
    npm install
3. Configurar la API (si es necesario)
Si tienes un backend en una URL diferente, modifica en src/app/services/employee.service.ts:
# Ejecución en Desarrollo
Iniciar el servidor de desarrollo
    ng serve
La aplicación estará disponible en:
    http://localhost:4200
El servidor se reiniciará automáticamente cuando hagas cambios en los archivos.
Ejecución en Producción
Compilar para producción
    ng build --configuration production

# Testing
Ejecutar los tests
    ng test
    Se abrirá un navegador mostrando los tests en tiempo real.
    27 tests en total

Pruebas para:

-Servicios 
-Componentes 
-Pipes 
-Directivas 
-Guards 


# Docker
Construir la imagen Docker
    docker build -t employees-app:1.0 .
Ejecutar el contenedor
    docker run -p 8080:80 employees-app:1.0
Accede a la aplicación en:
    http://localhost:8080

Para detener:
    docker stop <idcontainer>

# Estructura del Proyecto
src/app/
├── components/
│   ├── lista-employees/         # Componente lista principal
│   ├── employees-form/          # Formulario crear empleado
│   └── employees-form-editar/   # Formulario editar empleado
├── services/
│   └── employee.service.ts      # Servicio para gestionar empleados
├── pipes/
│   ├── employee-status.pipe.ts  # Pipe para formatear estado
├── directives/
│   └── highlight-hover.directive.ts  # Directiva de highlight
├── guards/
│   └── route-logger.guard.ts    # Guard que registra rutas
├── interceptors/
│   └── http-config.interceptor.ts    # Interceptor HTTP
└── app.routes.ts                # Definición de rutas
Características Principales
1. Gestión de Empleados

-Ver lista completa de empleados
-Crear nuevos empleados
-Editar información existente
-Activar/Desactivar empleados
-Buscar por cédula

2. Formularios Reactivos

-Validación en tiempo real
-Validadores personalizados:
    Cédula: 10 dígitos
    Teléfono: 10 dígitos
    Nombre: mínimo 3 caracteres, solo letras
    Dirección: mínimo 5 caracteres


Mensajes de error descriptivos

4. Pipes Personalizados

EmployeeStatusPipe: Muestra "Activo" o "Inactivo"

5. Directivas Personalizadas

HighlightHoverDirective: Agrega borde azul al pasar el mouse

6. Comunicación Reactiva

RxJS Subjects para comunicación entre componentes
Observable para cambios de empleados
Notificaciones automáticas de cambios

7. Enrutamiento

Lazy loading de componentes
Guards que registran rutas en consola
Rutas parametrizadas para edición

8. Interceptores HTTP

Agregan headers personalizados
Manejo centralizado de errores
Logs de peticiones

9. Tests Unitarios

tests con Jasmine/Karma
Tests de servicios, componentes, pipes, directivas

10. Containerización

Docker multi-stage build
Nginx como servidor web

Ciclo de Vida de la Aplicación
Cuando inicias la app, ocurre lo siguiente:

-Carga inicial: Se inicializa ListaEmployeesComponent
-ngOnInit: Se cargan los empleados desde el servicio
-Suscripción: Se activan las suscripciones a cambios de empleados
-Console logs: Se registran los eventos en la consola
-Interacción: Usuario puede crear, editar o cambiar estado
-Subject notification: Se emiten notificaciones a través de Subjects
-Auto-actualización: La lista se actualiza sin recargar

API Endpoints (Esperados)
Si usas un backend real, estos son los endpoints esperados:
GET    /api/v1/employee                          # Listar todos
GET    /api/v1/employee/getById/{id}             # Obtener por ID
GET    /api/v1/employee/getByCedula/{cedula}     # Buscar por cédula
POST   /api/v1/employee/registrarEmpleado        # Crear
PUT    /api/v1/employee/actualizarEmpleado/{id}  # Actualizar
PATCH  /api/v1/employee/actualizarEstado/{id}    # Cambiar estado
Logs en Consola
La aplicación registra eventos importantes en la consola (F12):
Rutas
════════════════════════════════════
🔹 ENTRANDO A LA RUTA: /
🔹 Fecha y hora: 14/10/2025, 10:30:45
════════════════════════════════════
Ciclo de Vida
ListaEmployeesComponent - Constructor ejecutado
ListaEmployeesComponent - ngOnInit: Componente inicializado
Empleados cargados: 5 empleados
Peticiones HTTP
    HTTP REQUEST
    Método: GET
    URL: http://localhost:8080/api/v1/employee
    HTTP RESPONSE SUCCESS
Cambios de Estado
    Notificación enviada: Nuevo empleado agregado
    NOTIFICACIÓN RECIBIDA: Nuevo empleado agregado
    Empleado Pedro agregado a la lista


