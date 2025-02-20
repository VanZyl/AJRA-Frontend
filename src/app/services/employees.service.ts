import { inject, Injectable } from '@angular/core';
import { Employee } from '../model/employee.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  http = inject(HttpClient);
  // url = 'http://localhost:5146/api/employee'
  
  getEmployees(){
    const url = 'http://localhost:5146/api/employee'
    return this.http.get<Array<Employee>>(url)
  }

  updateEmployee(employee: Employee){
    const url = 'http://localhost:5146/api/employee/' + employee.id
    return this.http.put(url, employee)
  }

  createEmployee(employee: Employee){
    const url = 'http://localhost:5146/api/employee'
    return this.http.post(url, employee)
  }

  deleteEmployee(employee: Employee){
    const url = 'http://localhost:5146/api/employee/' + employee.id
    return this.http.delete(url)
  }

  getEmployeeLeave(employee: Employee){
    const url = 'http://localhost:5146/api/employeeleave/' + employee.id
    return this.http.get(url)
  }


}
