import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelcase'
})
export class CamelCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value
      .split(' ')
      .map(v => this.capitalize(v))
      .join(' ');
  }

  capitalize(word: string) {
    return word.substring(0, 1).toUpperCase()
      + word.substring(1).toLowerCase();
  }

}
