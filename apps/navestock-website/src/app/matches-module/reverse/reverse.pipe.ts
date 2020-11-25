import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverseArray'
})
export class ReverseArrayPipe implements PipeTransform {

  reverseOutput: any;
  transform(input: any): any {
    if(Array.isArray(input)){
      input.sort();
      this.reverseOutput = input.reverse();
    }
    else {
      this.reverseOutput = input;
    }
    console.log('ReverseArrayPipe: ' + JSON.stringify(this.reverseOutput));
    return this.reverseOutput;
  }

}
