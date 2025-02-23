import { Component, inject, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../model/employee.type';
import { Redbook } from '../../../model/redbook.type';
import { PayslipsService } from '../../../services/payslips.service';
import { catchError } from 'rxjs';
import { RedbookComplete } from '../../../model/redbookcomplete.type';

@Component({
  selector: 'app-employee-deductions',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-deductions.component.html',
  styleUrl: './employee-deductions.component.scss'
})
export class EmployeeDeductionsComponent implements OnChanges, OnInit {
  employee = input.required<Employee>();
  payslipService = inject(PayslipsService);
  redbookItems =  signal<Array<RedbookComplete>>([]);  
  isEditing = signal<boolean>(false);

  ngOnChanges(): void {
    this.payslipService.getRedbookEntries(this.employee().id)
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error;
      }
    ))
    .subscribe((item: any) => {
      this.redbookItems.set(
        item.sort((a: RedbookComplete, b: RedbookComplete) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    });
  }

  ngOnInit(): void {
    this.payslipService.getRedbookEntries(this.employee().id)
    .pipe(
      catchError((error: any) => {
        console.log(error);
        throw error;
      }
    ))
    .subscribe((item: any) => {
      this.redbookItems.set(
        item.sort((a: RedbookComplete, b: RedbookComplete) => new Date(a.date).getTime() - new Date(b.date).getTime())
      );
    });
  }
}
