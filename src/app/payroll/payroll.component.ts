import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownPayrollComponent } from "../components/dropdown-payroll/dropdown-payroll.component";
import { EmployeesService } from '../services/employees.service';
import { PayslipsService } from '../services/payslips.service';
import { Employee } from '../model/employee.type';
import { Payslip } from '../model/payslip.type';
import { catchError, single } from 'rxjs';
import { FilterPayslipsCardsPipe } from '../pipes/filter-payslips-cards.pipe';
import { FilterActiveEmployeesPipe } from '../pipes/filter-active-employees.pipe';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [PayrollComponent, FormsModule, DropdownPayrollComponent,FilterPayslipsCardsPipe,FilterActiveEmployeesPipe],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit {
  employeeService = inject(EmployeesService);
  payslipService = inject(PayslipsService);
  loading: boolean = false;
  file: File | null = null;
  shortLink: string = "";
  payslipCycles = signal<Array<string>>([]);
  selectedPayslipCycle = signal('Select Payslip Cycle');
  selectedEmployee = signal('Select Employee');
  searchTerm = signal('');
  editPayslip: boolean = false;
  uniforms = signal(0.0);
  tillShortage = signal(0.0);
  wastage = signal(0.0);
  otherDeductions = signal(0.0);
  reason = signal('');

  today = new Date();
  day = signal(this.today.getDate().toString().padStart(2, '0'));
  month = signal((this.today.getMonth() + 1).toString().padStart(2, '0'));
  year = signal(this.today.getFullYear());


  employeeItems: Employee[] = [];
  payslipItems: Payslip[] = [];

  getPayrollSummary(){
    console.log("Working");
    this.payslipService.getPayslipSummary(this.selectedPayslipCycle().toString()).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'PayslipSummary.pdf'; // Change the file name as needed
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  loadEmployeePayslip(){
    // console.log("Working on adding the feature needs some html to still function");
    const payslipId = this.selectedEmployee().toString() + "-" + this.selectedPayslipCycle().toString();
    this.payslipService.getPayslipById(payslipId).subscribe(data => {
      this.payslipItems.push(data);
      sessionStorage.setItem('myPayslips', JSON.stringify(this.payslipItems));
      this.editPayslip = true;
    });
  }

  clearPayslipItems(){
    sessionStorage.removeItem('myPayslips');
    this.payslipItems = [];
  }


  ngOnInit(): void {
    this.payslipService.getPayslipCycles().subscribe(cycles => {
      this.payslipCycles.set(cycles);
    });
    const storedPayslips = sessionStorage.getItem('myPayslips');
    console.log(storedPayslips);
    if (storedPayslips) {
      this.payslipItems = JSON.parse(storedPayslips);
    }
    // this.payslipItems = JSON.parse(storedPayslips);
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
  }

  onChange(event: any){
    this.file = event.target.files[0];
  }

  addPayslip(employeepayslip: Payslip){
    const employeeItem = this.employeeItems.filter(employee => employee.id === employeepayslip.employeeId);
    if (this.editPayslip){
      this.payslipService.updatePayslip(employeepayslip, employeeItem[0]).subscribe(data => {
        console.log(data);
      });
      this.payslipItems = this.payslipItems.filter(payslip => payslip.employeeId !== employeepayslip.employeeId);
      sessionStorage.setItem('myPayslips', JSON.stringify(this.payslipItems));
    }else{
      this.payslipService.addPayslip(employeepayslip, employeeItem[0]).subscribe(data => { 
        console.log(data);
      });
      this.payslipItems = this.payslipItems.filter(payslip => payslip.employeeId !== employeepayslip.employeeId);
      sessionStorage.setItem('myPayslips', JSON.stringify(this.payslipItems));
    }
    
  }

  onUpload(){
    this.loading = !this.loading;
    console.log(this.file);
    for (let i = 0; i < this.employeeItems.length; i++) {
    
      if (this.file && this.employeeItems[i].workStatus === 'Active') {
        this.payslipService.createPaySlip(this.file, this.employeeItems[i]).subscribe(data => {
            const payslip: Payslip = {
              id : data.id,
              name  : data.name,
              surname  : data.surname,
              hourlyRate : data.hourlyRate,
              salary : this.employeeItems[i].salary,
              normalHoursWorked : data.normalHoursWorked,
              normalAmountPaid : data.normalAmountPaid,
              overtimeHoursWorked : data.overtimeHoursWorked,
              overtimeAmountPaid : data.overtimeAmountPaid,
              publicHolidayHoursWorked : data.publicHolidayHoursWorked,
              publicHolidayAmountPaid : data.publicHolidayAmountPaid,
              leaveHoursWorked : 0.0,
              leaveAmountPaid : 0.0,
              grossAmount : data.grossAmount,
              uifContribution : data.uifContribution,
              barganingCouncil : data.barganingCouncil,
              uniforms  : data.uniforms,
              tillShortage : data.tillShortage,
              wastages : data.wastages,
              otherDeductions : data.otherDeductions,
              netAmount : data.netAmount,
              leaveBF   : this.employeeItems[i].leave,
              leaveAcc : data.leaveAcc,
              leaveTaken : 0.0,
              sickLeaveTaken : 0.0,
              otherTaken : 0.0,
              paySlipCycle   : data.paySlipCycle,
              paySlipDate : data.paySlipDate,
              employeeId : this.employeeItems[i].id,
              workdays : data.workdays
            }
            this.payslipItems.push(payslip);
            this.editPayslip = false;
            console.log("Saving Payslips");
            sessionStorage.setItem('myPayslips', JSON.stringify(this.payslipItems));
        });
        console.log(this.payslipItems);
        
      } else {
        console.error('No file selected');
      }
    }
  }

  addDeduction(){
    console.log(this.selectedEmployee().toString());
    const formattedDate = `${this.year()}-${String(this.month()).padStart(2, '0')}-${String(this.day()).padStart(2, '0')}T00:00:00Z`;
    const redbook = {
      employeeId : this.selectedEmployee().toString(),
      uniforms : this.uniforms(),
      tillShortage : this.tillShortage(),
      wastage : this.wastage(),
      otherDeductions : this.otherDeductions(),
      date : formattedDate,
      reason : this.reason()
    }
    this.payslipService.addRedbookEntry(redbook).subscribe(data => {
      console.log(data);
    });
    if(confirm('Deduction added successfully')){
      this.selectedEmployee.set('Select Employee');
      this.uniforms.set(0.0);
      this.tillShortage.set(0.0);
      this.wastage.set(0.0);
      this.otherDeductions.set(0.0);
      this.reason.set('');
    }


    
    
  }

}
