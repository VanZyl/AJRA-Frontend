import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Employee } from '../../model/employee.type';
import { FilterEmployeesPipe } from '../../pipes/filter-employees.pipe';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employeedata-database',
  standalone: true,
  imports: [FilterEmployeesPipe, FormsModule],
  templateUrl: './employeedata-database.component.html',
  styleUrl: './employeedata-database.component.scss'
})
export class EmployeedataDatabaseComponent  {
  employeeService = inject(EmployeesService);
  employeeItems = input.required<Array<Employee>>();
  searchTerm = signal('');
  
  statuses = signal<string[]>(['Active','Suspended','Terminated']);
  Designations = signal<string[]>(['Supervisor','Catering Assistant','Independant Contractor']);

  oldEmployee: any;
  newEmployee: boolean = false;

  onStatusSelect(employee: Employee){
    const CurrentDate = new Date();
    employee.statusChangeDate = this.formatDate(CurrentDate);
    console.log(employee.name);
    console.log(employee.workStatus);
  }

    // Custom method to format date
    formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = this.padZero(date.getMonth() + 1); // Months are zero-based
      const day = this.padZero(date.getDate());

  
      return `${year}-${month}-${day}`;
    }
  
    // Helper method to pad single digits with a leading zero
    padZero(value: number): string {
      return value < 10 ? `0${value}` : value.toString();
    }

  onDesignationSelect(employee: Employee){
    console.log(employee.name);
    console.log(employee.designation);
  }

  onEdit(employee: Employee){
    if(this.newEmployee == true){
      this.employeeItems().shift();
      this.newEmployee = false;
    }
    this.oldEmployee = JSON.stringify(employee);
    const employeeArray = this.employeeItems();
    this.employeeItems().forEach((element) => {
      element.isEditing = false; // Reset isEditing
    });
    employee.isEditing = true; // Set isEditing for the selected employee
  }

  onCancel(employee: Employee){
    if(this.newEmployee == false){
      const oldEmp = JSON.parse(this.oldEmployee);
      employee.id = oldEmp.id;
      employee.name = oldEmp.name;
      employee.surname = oldEmp.surname;
      employee.idNumber = oldEmp.idNumber;
      employee.hourlyRate = oldEmp.hourlyRate;
      employee.designation = oldEmp.designation;
      employee.leave = oldEmp.leave;
      employee.sickLeave = oldEmp.sickLeave;
      employee.otherLeave = oldEmp.otherLeave;
      employee.salary = oldEmp.salary;
      employee.taxRefNum = oldEmp.taxRefNum;
      employee.workStatus = oldEmp.workStatus;
      employee.statusChangeDate = oldEmp.statusChangeDate;
      employee.isEditing = false;
      this.newEmployee = false;
    }else{
      this.employeeItems().shift();
      this.newEmployee = false;
    }
  }

  onSave(employee: Employee){
    if(this.newEmployee){
      this.employeeService.createEmployee(employee).subscribe((data) => {
        console.log(data);
      });
      confirm('Employee ' + employee.name + ' ' + employee.surname + ' has been added to the database');
      console.log('Add Employee');
      console.log(employee);
      this.newEmployee = false;
      employee.isEditing = false;
    }else{
      this.employeeService.updateEmployee(employee).subscribe((data) => {
        console.log(data);
      });
      employee.isEditing = false;
    }
  }

  onDelete(employee: Employee){
    if (confirm('Are you sure you want to delete ' + employee.name + ' ' + employee.surname + '?')) {
      console.log('Delete Employee');
      this.employeeService.deleteEmployee(employee).subscribe((data) => {
        console.log(data);
      });
      const index = this.employeeItems().indexOf(employee);
      this.employeeItems().splice(index, 1);
    }
  }

  onAdd(){
    console.log('Add Employee');
    const obj ={
        "id": "",
        "name": "",
        "surname": "",
        "idNumber": "",
        "hourlyRate": 0,
        "designation": "",
        "leave": 0,
        "sickLeave": 0,
        "otherLeave": 0,
        "salary": 0,
        "taxRefNum": "",
        "workStatus": "",
        "statusChangeDate": "",
        "storeId": "",
        "storeDesignation": "",
        "bankName": "",
        "accountNumber": "",
        "isEditing": true
    };
    this.employeeItems().unshift(obj);
    this.newEmployee = true;
  }

}
