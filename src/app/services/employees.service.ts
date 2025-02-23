import { inject, Injectable } from '@angular/core';
import { Employee } from '../model/employee.type';
import { HttpClient } from '@angular/common/http';
import { Leave } from '../model/leave.type';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  http = inject(HttpClient);
  url = 'http://192.168.0.181:50000'
  // url = 'http://localhost:5146'

  
  getEmployees(){
    // const url = 'http://localhost:5146/api/employee'
    const url = this.url + '/api/employee'
    return this.http.get<Array<Employee>>(url)
  }

  updateEmployee(employee: Employee){
    // const url = 'http://localhost:5146/api/employee/' + employee.id
    const url = this.url + '/api/employee/' + employee.id
    return this.http.put(url, employee)
  }

  createEmployee(employee: Employee){
    // const url = 'http://localhost:5146/api/employee'
    const url = this.url + '/api/employee'
    return this.http.post(url, employee)
  }

  deleteEmployee(employee: Employee){
    // const url = 'http://localhost:5146/api/employee/' + employee.id
    const url = this.url + '/api/employee/' + employee.id
    return this.http.delete(url)
  }

  getEmployeeLeave(employee: Employee){
    // const url = 'http://localhost:5146/api/employeeleave/' + employee.id
    const url = this.url + '/api/employeeleave/' + employee.id
    return this.http.get(url)
  }

    addEmployeeLeave(leaveitem: Leave){
    // const url = 'http://localhost:5000/api/employeeleave'
    const url = this.url + '/employeeleave'
    return this.http.post(url, leaveitem)
  }

}
