import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Employee } from '../../../model/employee.type';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from '../../../services/employees.service';
import { Leave } from '../../../model/leave.type';
import { catchError } from 'rxjs';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-employeeleave',
  standalone: true,
  imports: [FormsModule, JsonPipe, CommonModule],
  templateUrl: './employeeleave.component.html',
  styleUrl: './employeeleave.component.scss'
})
export class EmployeeleaveComponent implements OnChanges{
  employee = input.required<Employee>();
  employeeService = inject(EmployeesService);
  leaveItems =  signal<Array<Leave>>([]);  
  isEditing = signal<boolean>(false);

  leaveOptions = [
    { label: 'Leave Accrued', code: '001' },
    { label: 'Leave Taken', code: '010' },
    { label: 'Sick Leave Taken', code: '100' },
  ];


 ngOnChanges(changes: SimpleChanges):void {
    if (changes['employee']) {
      this.isEditing.set(false);

      this.employeeService.getEmployeeLeave(this.employee())
      .pipe(
        catchError((error: any) => {
          console.error(error); // Log the error for debugging
          throw error; // Re-throw the error to propagate it
        })
      )
      .subscribe((leave: any) => {
        // Cast the response to a list of Leave datatype
        const leaveList: Leave[] = leave as Leave[];

        // Sort the leaveList by dateFrom in ascending order
        leaveList.sort((a, b) => {
          const dateA = new Date(a.dateFrom).getTime();
          const dateB = new Date(b.dateFrom).getTime();
          return dateA - dateB; // Ascending order
        });

        // Update your leaveItems with the typed list
        this.leaveItems.set(leaveList);

        // Log the leaveItems for debugging
        console.log(this.leaveItems());
      });
    }
  }

  addLeave(){
    this.isEditing.set(true);
    this.leaveItems.update((current) => [
      ...current, // Spread the existing items
      { transCode : '',employeeId : '',description : '',dateFrom : '',dateTo : '',daysTaken: 0,daysAccrued: 0,daysDue: 0,remarks : '',} // Add empty Leave item
    ]);
  }

  saveLeave(){
    this.isEditing.set(false);
    this.leaveItems()[this.leaveItems().length - 1].employeeId = this.employee().id;
    this.employeeService.addEmployeeLeave(this.leaveItems()[this.leaveItems().length - 1]).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.leaveItems()[this.leaveItems().length - 1]);
  }

  // Update the TransCode based on the selected Description
  updateTransCode(item: any) {
    const selectedOption = this.leaveOptions.find(
      (option) => option.label === item.description
    );
    if (selectedOption) {
      // item.TransCode = selectedOption.code;
      this.leaveItems()[this.leaveItems().length - 1].transCode = selectedOption.code.toString();
    }
  }

  // Get the amount of days between the Datefrom until the date to
  getDay(){
    const dateFrom = new Date(this.leaveItems()[this.leaveItems().length - 1].dateFrom);
    const dateTo = new Date(this.leaveItems()[this.leaveItems().length - 1].dateTo);
    const diffTime = Math.abs(dateTo.getTime() - dateFrom.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1;
    this.leaveItems()[this.leaveItems().length - 1].daysTaken = diffDays;
    
  }
}
