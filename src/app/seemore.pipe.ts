import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemore',
  standalone: true
})
export class SeemorePipe implements PipeTransform {

  transform(desc:string, limit: number): string {
    return desc?.split(' ').slice(0, limit).join(' ');
  }

}
