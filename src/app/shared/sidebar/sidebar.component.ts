import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { ClientService } from 'src/app/service/client.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription | undefined;
  // oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
  userTypes : any;
  constructor(private caseService: CaseService,private clientService : ClientService) { }
  ngOnInit(): void {
    // this.userTypes = JSON.parse(this.oLoggedInUser).UserType;
    this.roleBasedAccess();
  }
  logout() {
    window.location.reload();
    sessionStorage.clear();
  }

  //Role base access permission Module
  roleBasedAccessModule: any = [];
  subscriptionRoleModule: Subscription | undefined;
  clientPageAccessModule: any;
  reportPageAccessModule: any;
  adminPageAccessModule: any;
  casePageAccessModule: any;
  roleBasedAccess() {
    this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
      this.roleBasedAccessModule = result;
      [...this.roleBasedAccessModule].map(item => {
        if (item.FeatureName === 'Client_Page') { this.clientPageAccessModule = item.FeatureStatus; }
        else if (item.FeatureName === 'Report_Page') { this.reportPageAccessModule = item.FeatureStatus; }
        else if (item.FeatureName === 'Admin_Page') { this.adminPageAccessModule = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_Page') { this.casePageAccessModule = item.FeatureStatus; }
      });
    })
  }
  routerActive(){
    this.clientService.emitClientId('null');
  }
  //End Access permission 
  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
    this.subscriptionRoleModule?.unsubscribe();
  }
}
