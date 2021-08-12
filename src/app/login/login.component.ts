import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoggedUser, LoginRQ, LoginRS, RelatedTeams } from './loginDataModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userEmail: string;
  userPassword: string;

  oLoginRq: LoginRQ;
  oLoginRS: LoginRS = new LoginRS;

  oLoggedUser?: LoggedUser;
  oRelatedTeams?:RelatedTeams;
  
  constructor(private router: Router, private loginService: LoginService) {
    this.userEmail = "";
    this.userPassword = "";

    this.oLoginRq = new LoginRQ();
    this.oLoginRq.emailID = "";
    this.oLoginRq.password = "";
  }

  ngOnInit(): void {
  }



  performAuth() {
    if (this.userEmail && this.userPassword) {
      debugger;
      this.oLoginRq.emailID = this.userEmail;
      this.oLoginRq.password = this.userPassword;
      //this.router.navigate(['dashboard']);

      this.loginService.authenticateLogin(this.oLoginRq).subscribe((res: LoginRS) => {
        if (res.status) 
        {
          if (res.data && res.data.length > 0) 
          {            
            let loggedInUser = res.data[0][0];
            let relatedTeams=res.data[1];

            this.oLoggedUser = loggedInUser;
            this.oRelatedTeams = relatedTeams;
            
            sessionStorage.setItem('_loggedInUser',JSON.stringify(loggedInUser));
            sessionStorage.setItem('_relatedTeams',JSON.stringify(relatedTeams));

            this.router.navigate(['dashboard']);
          }
          else
          {
            alert('Login Failed.');
          }
          
        }
      });
    }
    else {
      alert('Validation Failed...');
    }
  }

}