import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCases'
})
export class FilterCasesPipe implements PipeTransform {

  transform(items: any[], searchText: any): unknown {
    
    if (!items || !searchText) {
      return items;
    }
    return items.filter(item => item.FullName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  }

}
