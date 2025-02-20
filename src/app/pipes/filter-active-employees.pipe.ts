import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/employee.type';

@Pipe({
  name: 'filterActiveEmployees',
  standalone: true
})
export class FilterActiveEmployeesPipe implements PipeTransform {

  transform(employees: Employee[]): unknown {
    return employees.filter(employee => employee.workStatus === 'Active');
  }

}
