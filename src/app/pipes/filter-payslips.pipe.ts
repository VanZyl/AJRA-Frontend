import { Pipe, PipeTransform } from '@angular/core';
import { Payslip } from '../model/payslip.type';

@Pipe({
  name: 'filterPayslips',
  standalone: true
})
export class FilterPayslipsPipe implements PipeTransform {

  transform(payslip: Payslip[], searchTerm: string): Payslip[] {
    if(searchTerm === 'All Employees'){
      return payslip;
    }
    if(!searchTerm){
      return payslip;
    }
    const text = searchTerm.toLowerCase();
    return payslip.filter( payslip => {
      const payslipName = payslip.name.toLowerCase()+ " " + payslip.surname.toLowerCase();
      if (payslipName === text){
        return true;
      }else{
        return false;
      }
    })

  }

}
