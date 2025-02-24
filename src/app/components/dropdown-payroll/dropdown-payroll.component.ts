import { JsonPipe } from '@angular/common';
import { Component, computed, inject, Input, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PayslipsService } from '../../services/payslips.service';
import { Payslip } from '../../model/payslip.type';
import { using } from 'rxjs';

@Component({
  selector: 'app-dropdown-payroll',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dropdown-payroll.component.html',
  styleUrl: './dropdown-payroll.component.scss'
})
export class DropdownPayrollComponent implements OnInit{
  payslip = input.required<Payslip>();
  // clonedPayslip = computed<Payslip>(() => ({ ...this.payslip() }));
  clonedPayslip !: Payslip;
  SubmitEvent = output<Payslip>();
  leaveDue = signal(0);
  exclusionList = signal('');
  payslipService = inject(PayslipsService);
  isExpanded: boolean = false;
  isLittleExpanded: boolean = false;
  response: any = null;
  excludeNormal: number = 0;
  excludeOvertime: number = 0;
  excludePublicHoliday: number = 0;

  processedData: any[] = [];

  ngOnInit(): void {
    this.payslip().paySlipDate = this.payslip().paySlipDate.split('T')[0];
    this.leaveDue.set(this.payslip().leaveAcc + this.payslip().leaveBF);
    this.clonedPayslip = { ...this.payslip() };
  }


  toggleDropdown() {
    this.isExpanded = !this.isExpanded;
  }

  toggleMiniDropdown() {
    this.isLittleExpanded = !this.isLittleExpanded;
  }

  onSubmit() {
    console.log(this.payslip());
    this.SubmitEvent.emit(this.payslip());
  }

  addExclusion(){
    this.processData();
    console.log(this.exclusionList());
  }
  
  onNormalChanged(){
    this.payslip().normalAmountPaid = parseFloat((this.payslip().normalHoursWorked * this.payslip().hourlyRate).toFixed(2));
    this.payslip().grossAmount = parseFloat((this.payslip().normalAmountPaid + this.payslip().overtimeAmountPaid + this.payslip().publicHolidayAmountPaid + this.payslip().leaveAmountPaid).toFixed(2));
    this.payslip().netAmount = parseFloat((this.payslip().grossAmount - this.payslip().uifContribution - this.payslip().barganingCouncil - this.payslip().uniforms - this.payslip().tillShortage - this.payslip().wastages - this.payslip().otherDeductions).toFixed(2));
  }

  onOvertimeChanged(){
    this.payslip().overtimeAmountPaid = parseFloat((this.payslip().overtimeHoursWorked * this.payslip().hourlyRate * 1.5).toFixed(2));
    this.payslip().grossAmount = parseFloat((this.payslip().normalAmountPaid + this.payslip().overtimeAmountPaid + this.payslip().publicHolidayAmountPaid + this.payslip().leaveAmountPaid).toFixed(2));
    this.payslip().netAmount = parseFloat((this.payslip().grossAmount - this.payslip().uifContribution - this.payslip().barganingCouncil - this.payslip().uniforms - this.payslip().tillShortage - this.payslip().wastages - this.payslip().otherDeductions).toFixed(2));
  }

  onPublicHolidayChanged(){
    this.payslip().publicHolidayAmountPaid = parseFloat((this.payslip().publicHolidayHoursWorked * this.payslip().hourlyRate * 2).toFixed(2));
    this.payslip().grossAmount = parseFloat((this.payslip().normalAmountPaid + this.payslip().overtimeAmountPaid + this.payslip().publicHolidayAmountPaid + this.payslip().leaveAmountPaid).toFixed(2));
    this.payslip().netAmount = parseFloat((this.payslip().grossAmount - this.payslip().uifContribution - this.payslip().barganingCouncil - this.payslip().uniforms - this.payslip().tillShortage - this.payslip().wastages - this.payslip().otherDeductions).toFixed(2));
  }

  onLeaveHoursChanged(){
    this.payslip().leaveAmountPaid = parseFloat((this.payslip().leaveHoursWorked * this.payslip().hourlyRate).toFixed(2));
    this.payslip().grossAmount = parseFloat((this.payslip().normalAmountPaid + this.payslip().overtimeAmountPaid + this.payslip().publicHolidayAmountPaid + this.payslip().leaveAmountPaid).toFixed(2));
    this.payslip().netAmount = parseFloat((this.payslip().grossAmount - this.payslip().uifContribution - this.payslip().barganingCouncil - this.payslip().uniforms - this.payslip().tillShortage - this.payslip().wastages - this.payslip().otherDeductions).toFixed(2));
  }

  onDeduction(){
    this.payslip().netAmount = parseFloat((this.payslip().grossAmount - this.payslip().uifContribution - this.payslip().barganingCouncil - this.payslip().uniforms - this.payslip().tillShortage - this.payslip().wastages - this.payslip().otherDeductions).toFixed(2));
  }

  onLeaveTaken(){
    // this.payslip().leaveHoursWorked = parseFloat((this.payslip().leaveTaken * 7).toFixed(2));
    // this.payslip().leaveAmountPaid = parseFloat((this.payslip().leaveHoursWorked * this.payslip().hourlyRate).toFixed(2));
    // this.payslip().grossAmount = parseFloat((this.payslip().normalAmountPaid + this.payslip().overtimeAmountPaid + this.payslip().publicHolidayAmountPaid + this.payslip().leaveAmountPaid).toFixed(2));
    // this.payslip().uifContribution = parseFloat((this.payslip().grossAmount * 0.01).toFixed(2));
    // this.payslip().netAmount = parseFloat((this.payslip().grossAmount - this.payslip().uifContribution - this.payslip().barganingCouncil - this.payslip().uniforms - this.payslip().tillShortage - this.payslip().wastages - this.payslip().otherDeductions).toFixed(2));
    console.log("This is now done in the backend");
  }

  processData() {
    // Parse exclusions into a set of indices
    const exclusions = new Set(this.exclusionList().split(',').map(Number));
    console.log(exclusions);
    this.excludeNormal = 0;
    this.excludeOvertime = 0;
    this.excludePublicHoliday = 0;

    // Process data list
    this.processedData = this.payslip().workdays
      // .filter((_, index) => !exclusions.has(index)) // Exclude items by index
      .map((entry) => this.extractData(entry));

    console.log(this.processedData);
    this.processedData.forEach(element => {
      exclusions.forEach(exclusion => {
        if (parseInt(element.day.split("/")[1],10) === parseInt(exclusion.toString(),10)) {
          console.log('Exclusion Found: ' + element.day + " " + exclusion + " " + parseInt(element.day.split("/")[1],10));
          if (element.isSunday) {
            this.excludeOvertime += this.timeToFloat(element.totalHours);
          }
          if (element.isHoliday) {
            this.excludePublicHoliday += this.timeToFloat(element.totalHours);
          }
          if(!element.isSunday && !element.isHoliday){
            this.excludeNormal += this.timeToFloat(element.totalHours);
          }
        }
      });           
    });

    // console.log('Start of Print')
    // console.log(this.processedData);
    // console.log(this.excludeNormal);
    // console.log(this.excludeOvertime);
    // console.log(this.excludePublicHoliday);
    // console.log('End of Print')
    this.payslip().normalHoursWorked = parseFloat((this.clonedPayslip.normalHoursWorked - this.excludeNormal).toFixed(2));
    this.payslip().overtimeHoursWorked = parseFloat((this.clonedPayslip.overtimeHoursWorked - this.excludeOvertime).toFixed(2));
    this.payslip().publicHolidayHoursWorked = parseFloat((this.clonedPayslip.publicHolidayHoursWorked - this.excludePublicHoliday).toFixed(2));

    if (this.payslip().normalHoursWorked < 0) {
      this.payslip().normalHoursWorked = 0;
    }
    if (this.payslip().overtimeHoursWorked < 0) {
      this.payslip().overtimeHoursWorked = 0;
    }
    if (this.payslip().publicHolidayHoursWorked < 0) {
      this.payslip().publicHolidayHoursWorked = 0;
    }

    this.payslip().normalAmountPaid = parseFloat((this.payslip().normalHoursWorked * this.payslip().hourlyRate).toFixed(2));
    this.payslip().overtimeAmountPaid = parseFloat((this.payslip().overtimeHoursWorked * this.payslip().hourlyRate * 1.5).toFixed(2));
    this.payslip().publicHolidayAmountPaid = parseFloat((this.payslip().publicHolidayHoursWorked * this.payslip().hourlyRate * 2).toFixed(2));
    this.payslip().grossAmount = parseFloat((this.payslip().normalAmountPaid + this.payslip().overtimeAmountPaid + this.payslip().publicHolidayAmountPaid + this.payslip().leaveAmountPaid).toFixed(2));
    this.payslip().uifContribution = parseFloat((this.payslip().grossAmount * 0.01).toFixed(2));
    this.payslip().netAmount = parseFloat((this.payslip().grossAmount - this.payslip().uifContribution - this.payslip().barganingCouncil - this.payslip().uniforms - this.payslip().tillShortage - this.payslip().wastages - this.payslip().otherDeductions).toFixed(2));
    
  }

  timeToFloat(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours + minutes / 60 + seconds / 3600;
  }

  extractData(entry: string) {
    // Extract fields using regular expressions
    console.log(entry);
    const dayMatch = entry.match(/Current Day: (\d{2}\/\d{2}\/\d{4})/);
    const totalHoursMatch = entry.match(/Total Hours: (\d{2}:\d{2}:\d{2})/);
    const isSundayMatch = entry.match(/IsSunday:(True|False)/);
    const isHolidayMatch = entry.match(/IsHoliday:(True|False)/);

    console.log(dayMatch ? dayMatch[1] : null);
    return {
      day: dayMatch ? dayMatch[1] : null,
      totalHours: totalHoursMatch ? totalHoursMatch[1] : null,
      isSunday: isSundayMatch ? isSundayMatch[1] === 'True' : false,
      isHoliday: isHolidayMatch ? isHolidayMatch[1] === 'True' : false,
    };
  }

  tryItOut() {
    // Simulate an API call
    this.response = null; // Reset response
    this.response = {
      employees: [
        { id: 1, name: 'John Doe', position: 'Developer' },
        { id: 2, name: 'Jane Smith', position: 'Designer' }
      ]
    };
  }
}
