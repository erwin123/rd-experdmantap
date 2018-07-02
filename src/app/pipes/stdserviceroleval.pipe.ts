import { Pipe, PipeTransform } from '@angular/core';
import { Stdservice } from '../models/stdservice';

@Pipe({
  name: 'stdserviceroleval'
})
export class StdservicerolevalPipe implements PipeTransform {

  transform(value: Stdservice[], args?: any): any {
    if (!value || !args) {
      return value;
    }
    console.log(value);
    console.log(args);
    return value.filter(item => item.KdStdservice.indexOf(args) !== -1);
  }

}
