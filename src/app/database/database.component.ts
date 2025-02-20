import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeesviewComponent } from '../employeesview/employeesview.component';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../model/employee.type';
import { catchError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { FilterEmployeesPipe } from '../pipes/filter-employees.pipe';
import { EmployeedataDatabaseComponent } from '../components/employeedata-database/employeedata-database.component';
import { PayslipsService } from '../services/payslips.service';
import { Payslip } from '../model/payslip.type';
import { EmployeepayslipsDatabaseComponent } from "../components/employeepayslips-database/employeepayslips-database.component";

@Component({
  selector: 'app-database',
  standalone: true,
  imports: [FormsModule, EmployeedataDatabaseComponent, EmployeepayslipsDatabaseComponent],
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent implements OnInit{
  employeeService = inject(EmployeesService);
  payslipService = inject(PayslipsService);

  employeeItems = signal<Array<Employee>>([]);  
  payslipItems = signal<Array<Payslip>>([]);
  selectedOption = signal('Employee Database');

  ngOnInit(): void {
    this.employeeService.getEmployees()
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error;
      }
    ))
    .subscribe((employees) =>{
      this.employeeItems.set(employees.sort((a, b) => a.name.localeCompare(b.name)));
    })

    this.payslipService.getPaySlips()
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error;
      }
    ))
    .subscribe((payslips) =>{
      this.payslipItems.set(payslips.sort((a, b) => a.id.localeCompare(b.id)));
    })
  }

  


}
