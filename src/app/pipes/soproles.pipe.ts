import { Pipe, PipeTransform } from '@angular/core';
import { SOPKeys } from '../models/sopkeys';

@Pipe({
  name: 'soproles'
})
export class SoprolesPipe implements PipeTransform {

  transform(value: SOPKeys[], args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.filter(item => item.roleCode.indexOf(args) !== -1);
  }

}
