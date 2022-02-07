

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CaseService } from 'src/app/service/case.service';
import { FireDbService } from 'src/app/service/fire-db.service';
import { LoginService } from 'src/app/service/login/login.service';
import { LoggedUser, LoginRQ, LoginRS, RelatedTeams, RoleRQ } from 'src/app/service/login/loginDataModel';
import FireDbItem from 'src/app/shared/model/FireDbItem';

declare var CryptoJS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: any;
  error = '';
  passType: string = 'password';
  oLoginRq: LoginRQ;
  oLoginRS: LoginRS = new LoginRS;
  oRolerq: RoleRQ;
  oLoggedUser?: LoggedUser;
  oRelatedTeams?: RelatedTeams;
  oFireDbItem: FireDbItem = new FireDbItem();

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private router: Router,
    private loginService: LoginService, private toastr: ToastrService,
    private fireService: FireDbService,private caseService: CaseService  ) {

    this.oLoginRq = new LoginRQ();
    this.oRolerq = new RoleRQ();
    this.oRolerq.RoleId = "";

    if (this.loginService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  //optNumber form
  loginForm = this.formBuilder.group({
    userEmail: ['', [Validators.required, Validators.email]],
    userPassword: ['', [Validators.required]],
  });

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  signin() {
    this.submitted = true;
    
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    console.log('========================>',this.f.userPassword.value);
    
    let oLoginRq = {
      emailID: this.f.userEmail.value,
      password: CryptoJS.MD5(this.f.userPassword.value).toString()
    }

    this.loginService.authenticateLogin(oLoginRq)
      .subscribe((res: LoginRS) => {
        if (res.status) {
          if (res.data && res.data.length > 0 && res.data[0]["IsValid"]) {
            let loggedInUser = res.data[0];
            let relatedTeams = res.data[1];

            this.oLoggedUser = loggedInUser;
            this.oRelatedTeams = relatedTeams;

            sessionStorage.setItem('_loggedInUser', JSON.stringify(loggedInUser));
            sessionStorage.setItem('_relatedTeams', JSON.stringify(relatedTeams));
            //
            let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
            let req = {
              
                "Flag": "",
                "ModuleID": "",
                "RoleID": JSON.parse(oLoggedInUser).RoleID,
            
            }
            this.caseService.postData('fetchFeature',req).subscribe((result) => {
              console.log('role=====================>',result.data)

              this.caseService.roleBaseAccessModule(result.data);

            })
            //this.getAssociatedPrivilages();
            this.registerUserWithFireDb();

            this.router.navigateByUrl('/case');
          }
          else {
            this.toastr.error('Authentication Failed, Either user or password is incorrect.');
          }
        }
      }, error => { console.log('authenticateLogin Error', error) })
      .add(() => {

      });
  }

  private getAssociatedPrivilages() {
    let oLoggedInUser = sessionStorage.getItem("_loggedInUser") || "";

    this.oRolerq.RoleId = JSON.parse(oLoggedInUser).RoleID;
    this.loginService.GetRolePrivileges(this.oRolerq)
      .subscribe(data => {
        if (data.status) {
          if (data.status && data.data.length > 0) {
          }
        }
      }, error => { console.log('GetRolePrivileges Error', error) })
      .add(() => {

      });
  }

  private registerUserWithFireDb() {
    this.oFireDbItem.key = this.oLoggedUser?.UserID || '';
    this.oFireDbItem.action = "LoggedIn";
    this.oFireDbItem.message = "";
    this.oFireDbItem.caseId = "";

    this.fireService.createObject(this.oFireDbItem.key, this.oFireDbItem).then(() => {
      sessionStorage.setItem('fireBaseUserKey', this.oFireDbItem.key);
    });
  }

  // This part forgot password functionality implemented
  forgotClick() {
    this.router.navigateByUrl('/forgot');
  }
  //Show Password Icon
  showPassword() {
    if (this.passType == 'password') {
      this.passType = 'text'
    } else {
      this.passType == 'password'
    }
  }
}
