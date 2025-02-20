import { Component, inject, input, signal } from '@angular/core';
import { Payslip } from '../../model/payslip.type';
import { PayslipsService } from '../../services/payslips.service';
import { Employee } from '../../model/employee.type';
import { FormsModule } from '@angular/forms';
import { FilterPayslipsPipe } from '../../pipes/filter-payslips.pipe';

@Component({
  selector: 'app-employeepayslips-database',
  standalone: true,
  imports: [FormsModule, FilterPayslipsPipe],
  templateUrl: './employeepayslips-database.component.html',
  styleUrl: './employeepayslips-database.component.scss'
})
export class EmployeepayslipsDatabaseComponent {
  payslipItems = input.required<Array<Payslip>>();
  employeeItems = input.required<Array<Employee>>();

  selectedEmployee = signal('All Employees');

  payslipService = inject(PayslipsService);
  payslipSearchTerm = signal('');
  

}
