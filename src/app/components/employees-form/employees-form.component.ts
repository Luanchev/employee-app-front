import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './employees-form.component.html'
})
export default class EmployeesFormComponent implements OnInit, OnDestroy {

  formEmployee: FormGroup;

  // Validamos que la cédula tenga exactamente 10 dígitos
  cedulaValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const valid = /^[0-9]{10}$/.test(value);
    return valid ? null : { invalidCedula: true };
  }

  // Validamos que el teléfono tenga 10 dígitos
  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const valid = /^[0-9]{10}$/.test(value);
    return valid ? null : { invalidPhone: true };
  }

  // Validamos que el nombre tenga al menos 3 caracteres
  minLengthNameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    return value.length >= 3 ? null : { minLengthName: true };
  }

  // Validamos que solo contenga letras
  onlyLettersValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    
    const valid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value);
    return valid ? null : { onlyLetters: true };
  }


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {

    console.log('EmployeesFormComponent - Constructor ejecutado');

    this.formEmployee = this.fb.group({
      //aplicamos las validaciones en el formulario
      name: ['', [
        Validators.required,
        this.minLengthNameValidator.bind(this),
        this.onlyLettersValidator.bind(this)
      ]
      ],
      surname: ['', [
        Validators.required,
        this.minLengthNameValidator.bind(this),
        this.onlyLettersValidator.bind(this)
      ]],
      cedula: ['', [
        Validators.required,
        this.cedulaValidator.bind(this)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      telephone: ['', [
        Validators.required,
        this.phoneValidator.bind(this)
      ]],
      photo: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    console.log('EmployeesFormComponent - ngOnInit: Formulario de creación inicializado');
    console.log('Hora de inicialización:', new Date().toLocaleTimeString());
  }
  ngOnDestroy(): void {
    console.log('EmployeesFormComponent - ngOnDestroy: Formulario destruido');
    console.log('Hora de destrucción:', new Date().toLocaleTimeString());
  }

  create() {
    //Verificamos las vaidaciones antes de crear
    if (this.formEmployee.invalid) {
      console.log('Formulario inválido');
      this.formEmployee.markAllAsTouched(); 
      return;
    }
    const employee = {
      "name": this.formEmployee.value.name,
      "surname": this.formEmployee.value.surname,
      "cedula": this.formEmployee.value.cedula,
      "address": this.formEmployee.value.address,
      "telephone": this.formEmployee.value.telephone,
      "photo": this.formEmployee.value.photo,
      "active": true
    }

    this.formEmployee.value;
    this.employeeService.create(employee).subscribe(() => {
      console.log('Empleado creado exitosamente:', employee.name);
      this.router.navigate(['/']);
    });

  }
  getErrorMessage(fieldName: string): string {
    const field = this.formEmployee.get(fieldName);
    
    if (field?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (field?.hasError('minLengthName')) {
      return 'Debe tener al menos 3 caracteres';
    }
    if (field?.hasError('onlyLetters')) {
      return 'Solo se permiten letras';
    }
    if (field?.hasError('invalidCedula')) {
      return 'La cédula debe tener exactamente 10 dígitos';
    }
    if (field?.hasError('invalidPhone')) {
      return 'El teléfono debe tener exactamente 10 dígitos';
    }
    if (field?.hasError('minlength')) {
      return 'La dirección debe tener al menos 5 caracteres';
    }
    
    return '';
  }

}
