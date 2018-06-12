import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';

@Pipe({
  name: 'employeerole'
})
export class EmployeerolePipe implements PipeTransform {

  transform(value: Employee[], args?: any, args1?: any): any {
    if (!value || !args|| !args1) {
      return value;
    }
    return value.filter(item => item.roleCode.indexOf(args) !== -1).filter(item => item.week ===args1);
  }

}
