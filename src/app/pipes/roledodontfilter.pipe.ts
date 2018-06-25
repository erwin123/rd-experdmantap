import { Pipe, PipeTransform } from '@angular/core';
import { Dodont } from '../models/dodont';

@Pipe({
  name: 'roledodontfilter',
  pure: false
})
export class RoledodontfilterPipe implements PipeTransform {
  transform(value: Dodont[], args1?: any, args2?: boolean): any {
    if (value) {
      if (!value || !args1) {
        return value;
      }
      return value.filter(item => item.roleCode.indexOf(args1) !== -1).filter(item => item.dodont == args2);
    }
  }

}
