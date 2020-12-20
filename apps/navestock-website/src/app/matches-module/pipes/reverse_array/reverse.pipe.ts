import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseArray'
})
export class ReverseArrayPipe implements PipeTransform {

  reverseOutput: any;
  transform(value: any): any {
    if(Array.isArray(value)){
      value.sort();
      this.reverseOutput = value.reverse();
    }
    else {
      this.reverseOutput = value;
    }
    return this.reverseOutput;
  }

}
