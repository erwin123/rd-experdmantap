import { Pipe, PipeTransform } from '@angular/core';
import { Aspek } from '../models/aspek'

@Pipe({
  name: 'aspekparent'
})
export class AspekparentPipe implements PipeTransform {

  transform(value: Aspek[], args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.filter(item => item.ParentCode.indexOf(args) !== -1);
  }
}
