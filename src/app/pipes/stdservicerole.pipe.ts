import { Pipe, PipeTransform } from '@angular/core';
import { Stdservice } from '../models/stdservice';

@Pipe({
  name: 'stdservicerole'
})
export class StdservicerolePipe implements PipeTransform {

  transform(value: Stdservice[], args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.filter(item => item.Roleplay.indexOf(args) !== -1);
  }
}
