import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { LoginRQ, RoleRQ } from './loginDataModel';
import { User } from '../../_models/user';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private baseUrl: string;
  constructor(private httpClient: HttpClient, private appService: AppService) {
    this.baseUrl = appService.getBaseUrl();
    // this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    // let a = localStorage.getItem('currentUser')   sessionStorage.getItem("_loggedInUser") || ""
    // JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('_loggedInUser') !));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}



  authenticateLogin(loginRq: LoginRQ) {
    const url = `${this.baseUrl}/loginApi`;

    // return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password },{ headers: headers })
    // .pipe(map(user => {
    //     //store user details and jwt token in local storage to keep user logged in between page refreshes
    //     localStorage.setItem('currentUser', JSON.stringify(user));
    //     console.log('loooooo====>',user);
        
    //     this.currentUserSubject.next(user);
    //     return user;
    // }));


    // this.currentUserSubject.next('');
    return this.httpClient.post<any>(url, loginRq)
    .pipe(map(user => {
      //store user details and jwt token in local storage to keep user logged in between page refreshes
      // localStorage.setItem('currentUser', JSON.stringify(user));
      console.log('loooooo==user==>',user);
      
      this.currentUserSubject.next(user);
      return user;
  }));
  }


  public GetRolePrivileges(RoleRQ:RoleRQ):Observable<any>{
    console.log(RoleRQ);
      const url = `${this.baseUrl}/GetRolePrivileges`;
      return this.httpClient.post<any>(url, RoleRQ);
  }

}