import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { LoginRQ, LoginRS,LoginResult } from './loginDataModel';

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
  oLoginResult: LoginResult = new LoginResult;

  constructor(private router: Router, private loginService: LoginService) {
    this.userEmail = "";
    this.userPassword = "";

    this.oLoginRq = new LoginRQ();
    this.oLoginRq.userType = "agent";
    this.oLoginRq.sessionRequired = "T";
    this.oLoginRq.emailID = "";
    this.oLoginRq.password = "";
  }

  ngOnInit(): void {
  }



  performAuth() {
    if (this.userEmail && this.userPassword) 
    {
      debugger;
      this.oLoginRq.emailID = this.userEmail;
      this.oLoginRq.password = this.userPassword;

      this.loginService.authenticateLogin(this.oLoginRq).subscribe((res: LoginRS)=>
      {
        if(res && res.data.length > 0)
        {
          let status = res.data[0].Result.toUpperCase();
          if(status == "SUCCESS")
          {
            this.router.navigate(['dashboard']);
          }
          else
          {
            alert('Failed to login.');
          }
        }
      });      
    }
    else {
      alert('Validation Failed...');
    }
  }

}