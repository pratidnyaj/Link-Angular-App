import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public getBaseUrl() {
    return environment.baseUrl;
  }
  // public getBaseUrlNode() {
  //   return environment.baseUrlNode;
  // }
}
