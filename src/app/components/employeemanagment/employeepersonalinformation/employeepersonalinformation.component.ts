import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Employee } from '../../../model/employee.type';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-employeepersonalinformation',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employeepersonalinformation.component.html',
  styleUrl: './employeepersonalinformation.component.scss'
})
export class EmployeepersonalinformationComponent implements OnInit{
  employeeService = inject(EmployeesService);
  isNewEmployee = input.required<boolean>();
  employee = input.required<Employee>();
  Designations = signal<string[]>(['Supervisor','Catering Assistant','Independant Contractor']);
  statuses = signal<string[]>(['Active','Suspended','Terminated']);
  storeID = signal<string[]>(['All','Steers','Fishaways','Debonairs']);
  storeDesignation= signal<string[]>(['Manager','BOH','FOH']);

  ngOnInit() {
    // Manually call the onDesignationSelect function with the current employee
    console.log(this.employee());
    this.onDesignationSelect(this.employee());
  }


  getEmployee() {
    // console.log();
    // return this.employee();
  }

  onDesignationSelect(employee: Employee){
      console.log(employee.name);
      console.log(employee.designation);

  }
      // Helper method to pad single digits with a leading zero
  padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); // Months are zero-based
    const day = this.padZero(date.getDate());


    return `${year}-${month}-${day}`;
  }

  onStatusSelect(employee: Employee){
    const CurrentDate = new Date();
    employee.statusChangeDate = this.formatDate(CurrentDate);
    console.log(employee.name);
    console.log(employee.workStatus);
  }

  onSave(employee: Employee){
    if(confirm("Are you sure you want to save changes?")){
      if(this.isNewEmployee()){
        this.employeeService.createEmployee(employee).subscribe((data) => {
          console.log(data);
        });
        confirm('Employee ' + employee.name + ' ' + employee.surname + ' has been added to the database');
        console.log('Add Employee');
        console.log(employee);
        employee.isEditing = false;
      }else{
        console.log(employee);
        this.employeeService.updateEmployee(employee).subscribe((data) => {
          console.log(data);
        });
      }
    }
  }
}
