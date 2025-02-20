import { Pipe, PipeTransform } from '@angular/core';
import { Payslip } from '../model/payslip.type';

@Pipe({
  name: 'filterPayslipsCards',
  standalone: true
})
export class FilterPayslipsCardsPipe implements PipeTransform {

  transform(employ: Payslip[],searchTerm: string): Payslip[] {
    if(!searchTerm){
      return employ;
    }
    const text = searchTerm.toLowerCase();
    return employ.filter( employ => {

      if (employ.name.toLowerCase().includes(text)){
        return true;
      }else if (employ.surname.toLowerCase().includes(text)){
        return true;
      }else{
        return false;
      }
      // return employ.name.toLowerCase().includes(text); // This is the original line
    })
  }

}
