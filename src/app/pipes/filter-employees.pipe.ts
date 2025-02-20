import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/employee.type';

@Pipe({
  name: 'filterEmployees',
  standalone: true
})
export class FilterEmployeesPipe implements PipeTransform {

  transform(employ: Employee[],searchTerm: string): Employee[] {
    if(!searchTerm){
      return employ;
    }
    const text = searchTerm.toLowerCase();
    return employ.filter( employ => {

      if (employ.name.toLowerCase().includes(text)){
        return true;
      }else if (employ.surname.toLowerCase().includes(text)){
        return true;
      }else if (employ.workStatus.toLowerCase().includes(text)){
        return true;
      }else{
        return false;
      }
      // return employ.name.toLowerCase().includes(text); // This is the original line
    })
  }

}
