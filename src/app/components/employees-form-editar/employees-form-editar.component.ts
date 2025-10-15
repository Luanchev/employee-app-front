import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';

import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employees-form-editar',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './employees-form-editar.component.html'
})
export default class EmployeesFormEditarComponent implements OnInit, OnDestroy {

  id: any;
  employees: any[] = [];
  employee: any;
  formEmployee: FormGroup;

  constructor(
    private fb : FormBuilder,
    private router : Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ){
    console.log('EmployeesFormEditarComponent - Constructor ejecutado');

    this.formEmployee = this.fb.group({
      name:['', Validators.required],
      surname:['', Validators.required],
      cedula:['', Validators.required],
      address:['', Validators.required],
      telephone:['', Validators.required],
      photo:['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.employeeService.list().subscribe((employees:any)=>{
      this.employees = this.employees;
      console.log(employees);
      this.employees = employees;
      this.employee = this.employees.filter(employee => employee.id == this.id);

      this.formEmployee.controls['name'].setValue(this.employee[0].name);
      this.formEmployee.controls['surname'].setValue(this.employee[0].surname);
      this.formEmployee.controls['cedula'].setValue(this.employee[0].cedula);
      this.formEmployee.controls['address'].setValue(this.employee[0].address);
      this.formEmployee.controls['telephone'].setValue(this.employee[0].telephone);
      this.formEmployee.controls['photo'].setValue(this.employee[0].photo);

    })

  }
  ngOnDestroy(): void {
    console.log('EmployeesFormEditarComponent - ngOnDestroy: Formulario destruido');
    console.log('Hora de destrucción:', new Date().toLocaleTimeString());
  }

  update(){
    const employee={
      "name": this.formEmployee.value.name,
      "surname": this.formEmployee.value.surname,
      "cedula": this.formEmployee.value.cedula,
      "address": this.formEmployee.value.address,
      "telephone": this.formEmployee.value.telephone,
      "photo": this.formEmployee.value.photo

    }
    this.formEmployee.value;
    this.employeeService.update(this.id, employee).subscribe(()=>{
      this.router.navigate(['/']);
    });
  }

}
