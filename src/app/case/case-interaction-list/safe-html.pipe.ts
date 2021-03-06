//https://roufid.com/warning-sanitizing-unsafe-url-value-angular/
import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }


  transform(value: any, args?: any): any {
    //console.log('data',value);
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
