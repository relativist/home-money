import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'appFilter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }
    return items.filter(i => {
      let iElement = i[field];
      if (!isNaN(iElement)) {
        iElement += '';
      }

      if (field === 'type') {
        iElement = iElement === 'income' ? 'доход' : 'расход';
      }
      if (field === 'category') {
        iElement = i['catName'];
      }

      return iElement.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
