import { Pipe, PipeTransform } from '@angular/core';
import { Aspek } from '../models/aspek';

@Pipe({
  name: 'aspekflag'
})
export class AspekflagPipe implements PipeTransform {

  transform(value: Aspek[], args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.filter(item => item.FlagCard === args);
  }

}
