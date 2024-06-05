import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buy',
  standalone: true
})
export class BuyPipe implements PipeTransform {

  transform(ProductName: string): string {
    return `Buy ${ProductName}`;
  }

}
