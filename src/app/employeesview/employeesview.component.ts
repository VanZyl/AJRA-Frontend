import { Component, inject, signal } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { catchError } from 'rxjs';
import { Employee } from '../model/employee.type';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeleaveComponent } from '../components/employeemanagment/employeeleave/employeeleave.component';
import { EmployeepersonalinformationComponent } from '../components/employeemanagment/employeepersonalinformation/employeepersonalinformation.component';

@Component({
  selector: 'app-employeesview',
  standalone: true,
  imports: [FormsModule, CommonModule,EmployeeleaveComponent,EmployeepersonalinformationComponent],
  templateUrl: './employeesview.component.html',
  styleUrl: './employeesview.component.scss'
})
export class EmployeesviewComponent {
  employeeService = inject(EmployeesService);
  employeeItems: Employee[] = [];
  selectedEmployee = signal('Select Employee');
  employee: Employee = this.employeeItems[0];
  newEmployee: Employee = {
    id: "",
    name: "",
    surname: "",
    idNumber: "",
    hourlyRate: 0,
    designation: "",
    leave: 0,
    sickLeave: 0,
    otherLeave: 0,
    salary: 0,
    taxRefNum: "",
    workStatus: "",
    statusChangeDate: "",
    storeId: "",
    storeDesignation: "",
    bankName: "",
    accountNumber: "",
    isEditing: false
  }; 

  getEmployee(){
    console.log(this.selectedEmployee());
    //get from employee Items where the value of the id matches the selected employee
    this.employee = this.employeeItems.find(employee => employee.id === this.selectedEmployee()) || this.employeeItems[0];
  }

  constructor() {
    this.employeeService.getEmployees()
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error;
      }
    ))
    .subscribe((employees) =>{
      this.employeeItems = employees.sort((a, b) => a.name.localeCompare(b.name));
    })
    this.employee = this.employeeItems[0];
   }

  activeTab: string = 'personal';

  leaves = [
    {
      code: '0001',
      description: 'Annual Leave',
      openingBalance: 9.0,
      daysAccrued: 12.5,
      daysTaken: 11.0,
      daysDue: 10.5,
      cycleEntitlement: 15.0,
    },
    {
      code: '0002',
      description: 'Unpaid Leave',
      openingBalance: 0.0,
      daysAccrued: 0.0,
      daysTaken: 0.0,
      daysDue: 0.0,
      cycleEntitlement: 0.0,
    },
    {
      code: '0020',
      description: 'Sick Leave',
      openingBalance: 30.0,
      daysAccrued: 0.0,
      daysTaken: 0.0,
      daysDue: 30.0,
      cycleEntitlement: 30.0,
    },
  ];

  switchTab(tab: string) {
    console.log(this.selectedEmployee());
    this.activeTab = tab;
  }
}
