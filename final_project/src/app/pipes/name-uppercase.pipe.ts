import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameUppercase'
})
export class NameUppercasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value.toUpperCase();
  }
}
