import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Payslip } from '../model/payslip.type';
import { Employee } from '../model/employee.type';
import { Observable } from 'rxjs';
import { PayslipSummary } from '../model/payslipsummary.type';
import { Redbook } from '../model/redbook.type';
import { RedbookComplete } from '../model/redbookcomplete.type';

@Injectable({
  providedIn: 'root'
})
export class PayslipsService {
  http = inject(HttpClient);
  employeeName: string = '';
  url = 'http://192.168.0.181:50000'
  // url = 'http://localhost:5146'

  getPaySlips(){
    // const url = 'http://localhost:5146/api/payslip'
    const url = this.url + '/api/payslip'
    return this.http.get<Array<Payslip>>(url)
  }

  createPaySlip(file: File, employee : Employee):Observable<PayslipSummary>{
    this.employeeName = employee.name + ' ' + employee.surname;
    // const url = 'http://localhost:5146/api/payslip/process?employeeId=' + encodeURIComponent(employee.id) + '&workerName=' + encodeURIComponent(this.employeeName) + '&designation=' + encodeURIComponent(employee.designation) + '&hourlyRate=' + encodeURIComponent(employee.hourlyRate) + '&Salary=' + encodeURIComponent(employee.salary);
    const url = this.url + '/api/payslip/process?employeeId=' + encodeURIComponent(employee.id) + '&workerName=' + encodeURIComponent(this.employeeName) + '&designation=' + encodeURIComponent(employee.designation) + '&hourlyRate=' + encodeURIComponent(employee.hourlyRate) + '&Salary=' + encodeURIComponent(employee.salary);
    console.log(url);
    const formData = new FormData();
    formData.append('file', file,file.name);
    return this.http.post<PayslipSummary>(url, formData);
  }

  addPayslip(payslip: Payslip, employee: Employee){
    // const url = "http://localhost:5146/api/payslip/generatepayslip?designation=" + encodeURIComponent(employee.designation)
    const url = this.url + '/api/payslip/generatepayslip?designation=' + encodeURIComponent(employee.designation)
    return this.http.post<Payslip>(url, payslip)
  }

  getPayslipCycles(){
    // const url = "http://localhost:5146/api/payslip/distinctpayslipcycles"
    const url = this.url + '/api/payslip/distinctpayslipcycles'
    return this.http.get<Array<string>>(url)
  }

  getPayslipSummary(payslipcyle: string){
    // const url = "http://localhost:5146/api/payslip/payslipsummary?payslipcycle=" + encodeURIComponent(payslipcyle)
    const url = this.url + '/api/payslip/payslipsummary?payslipcycle=' + encodeURIComponent(payslipcyle)
    return this.http.get(url, {responseType: 'blob'})
  } 

  getPayslipById(payslipId: string){
    // const url = "http://localhost:5146/api/payslip/getpayslipbyid?id=" + encodeURIComponent(payslipId)
    const url = this.url + '/api/payslip/getpayslipbyid?id=' + encodeURIComponent(payslipId)
    return this.http.get<Payslip>(url)
  }

  updatePayslip(payslip: Payslip, employee: Employee){
    // const url = "http://localhost:5146/api/payslip/updatepayslip?designation=" + encodeURIComponent(employee.designation)
    const url = this.url + '/api/payslip/updatepayslip?designation=' + encodeURIComponent(employee.designation)
    return this.http.put<Payslip>(url, payslip)
  }

  addRedbookEntry(redbook: Redbook){
    console.log(redbook)
    // const url = "http://localhost:5146/api/redbook"
    const url = this.url + '/api/redbook'
    return this.http.post<Redbook>(url, redbook)
  }

  getRedbookEntries(employeeId: string){
    // const url = "http://localhost:5146/api/redbook/" + encodeURIComponent(employeeId)
    const url = this.url + '/api/redbook/employee?employeeId=' + encodeURIComponent(employeeId)
    return this.http.get<Array<RedbookComplete>>(url)
  }

  constructor() { }
}
