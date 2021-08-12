import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRQ,LoginRS } from './loginDataModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient : HttpClient) { }

  authenticateLogin(loginRq: LoginRQ) {
    return this
    .httpClient
    .post<any>("http://localhost:8005/api/loginApi",loginRq);
    //.post<any>("http://localhost/unfyd-link-old/AdminHandler?Action=CheckLogin",loginRq)
  }
}