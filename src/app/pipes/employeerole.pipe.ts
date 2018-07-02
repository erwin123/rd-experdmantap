import { Pipe, PipeTransform } from '@angular/core';
import { Employeewtt } from '../models/employeewtt';

@Pipe({
  name: 'employeerole'
})
export class EmployeerolePipe implements PipeTransform {

  transform(value: Employeewtt[], args?: any, args1?:number): any {
    if (!value || !args) {
      return value;
    }
    return value.filter(item => item.Roleplay.indexOf(args) !== -1 && item.Week == args1);
  }

}
