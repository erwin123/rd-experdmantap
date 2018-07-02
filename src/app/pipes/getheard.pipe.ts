import { Pipe, PipeTransform } from '@angular/core';
import { Getheard } from '../models/getheard'

@Pipe({
  name: 'getheardpipe',
  pure: false
})
export class GetheardPipe implements PipeTransform {

  transform(value: Getheard[], args1?: any, args2?: number): any {
    if (value) {
      if (!value || !args1) {
        return value;
      }
      return value.filter(item => item.Roleplay.indexOf(args1) !== -1).filter(item => item.Type == args2);
    }
  }

}
