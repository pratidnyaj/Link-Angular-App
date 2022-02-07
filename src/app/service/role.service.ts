import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
    private baseUrl: string;
    // private baseUrlNode: string;
    constructor(private httpclient: HttpClient, private appService: AppService) {
      this.baseUrl = appService.getBaseUrl();
      // this.baseUrlNode = appService.getBaseUrlNode();
    }

}