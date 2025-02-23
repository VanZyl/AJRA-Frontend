import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Employee } from '../../../model/employee.type';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from '../../../services/employees.service';
import { Leave } from '../../../model/leave.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-employeeleave',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employeeleave.component.html',
  styleUrl: './employeeleave.component.scss'
})
export class EmployeeleaveComponent implements OnChanges, OnInit{
  employee = input.required<Employee>();
  employeeService = inject(EmployeesService);
  leaveItems =  signal<Array<Leave>>([]);  
  isEditing = signal<boolean>(false);

  leaveOptions = [
    { label: 'Leave Accrued', code: '001' },
    { label: 'Leave Taken', code: '010' },
    { label: 'Sick Leave Taken', code: '100' },
  ];


 ngOnInit() {
    this.employeeService.getEmployeeLeave(this.employee())
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error;
      }
    ))
    .subscribe((leave: any) =>{
      this.leaveItems.set(leave.sort((a: Leave, b: Leave) => a.DateFrom.localeCompare(b.DateFrom)));
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.employeeService.getEmployeeLeave(this.employee())
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error;
      }
    ))
    .subscribe((leave: any) =>{
      this.leaveItems.set(leave.sort((a: Leave, b: Leave) => a.DateFrom.localeCompare(b.DateFrom)));
    })
  }

  addLeave(){
    this.isEditing.set(true);
    this.leaveItems.update((current) => [
      ...current, // Spread the existing items
      { TransCode : '',EmployeeId : '',Description : '',DateFrom : '',DateTo : '',DaysTaken: 0,DaysAccrued: 0,DaysDue: 0,Remarks : '',} // Add empty Leave item
    ]);
  }

  saveLeave(){
    this.isEditing.set(false);
    console.log(this.leaveItems()[this.leaveItems().length - 1]);
  }

  // Update the TransCode based on the selected Description
  updateTransCode(item: any) {
    const selectedOption = this.leaveOptions.find(
      (option) => option.label === item.Description
    );
    if (selectedOption) {
      item.TransCode = selectedOption.code;
    }
  }
}
