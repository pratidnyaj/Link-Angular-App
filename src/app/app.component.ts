import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CaseService } from './service/case.service';
import { LoginService } from './service/login/login.service';
import { AuthService } from './_helpers/PasswordValidator/auth/auth.timerLogout';
// import * as JSZipUtils   from '../assets/script/jszip-utils.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unfyd-link-app';
  currentUser: any;
  isHidden: boolean = true;
  isHidden1 : boolean = true;
  timerPopupModal : any =  false;
  activetimer: boolean = false;
  timerSubscription: Subscription | undefined;
  subscriptionPopupModal: Subscription | undefined;
  constructor(
    public router: Router,
    private authenticationService: LoginService, private authService: AuthService,
    private caseService: CaseService
  ) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/login']); // or redirect to default route
    }
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    //Role Base Access Permission
    if (sessionStorage.getItem("_loggedInUser") != null) {
      let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
      let req = {
        "Flag": "",
        "ModuleID": "",
        "RoleID": JSON.parse(oLoggedInUser).RoleID,
      }
      this.caseService.postData('fetchFeature', req).subscribe((result) => {
        this.caseService.roleBaseAccessModule(result.data);
      })
    }

    //End Role base Access Permission 
    this.subscriptionPopupModal = this.caseService.timerModalPopup.subscribe((data : any) => {
     if(data){
      this.isHidden1 = true;
     }else{
      this.isHidden1 = false;
     }
    })
  }
  @HostListener('document:keyup', ['$event'])
  @HostListener('document:click', ['$event'])
  @HostListener('document:wheel', ['$event'])
  @HostListener('document:onmousedown', ['$event'])
  @HostListener('document:onmouseup', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  // @HostListener('document:mouseup', ['$event'])
  // @HostListener('document:mouseover', ['$event'])
  resetTimer() {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser != null) {
      this.authService.notifyUserAction();
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionPopupModal?.unsubscribe();
  }
}
// events
// mousedown
// mouseup
// mousemove
// click
// dblclick
// mouseover
// mouseout
// mouseenter
// mouseleave
// contextmenu