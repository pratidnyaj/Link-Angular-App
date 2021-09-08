import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { LoginRQ, LoginRS } from './loginDataModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient, private appService: AppService) {
    this.baseUrl = appService.getBaseUrl();
  }

  authenticateLogin(loginRq: LoginRQ) {
    const url = `${this.baseUrl}/loginApi`;
    return this.httpClient.post<any>(url, loginRq);
  }
}