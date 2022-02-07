import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor( private router: Router,private caseService: CaseService) { }

  ngOnInit(): void {
    this.roleBasedAccess();
  }
  goToNextPage(){
    // this.router.navigateByUrl('/role-master');
    this.router.navigateByUrl('/role-master');
  }
  roleBasedAccessModule: any = [];
  subscriptionRoleModule: Subscription | undefined;
  agentPage  :any;
  teamsPage : any;
  rolePage : any;
  productPage : any;
  businessRolesPage : any;
  configurationPage : any;
  emailNotificationPage : any;
  businessObjectsPage : any;
  templatePage : any;
  dispositionPage : any;
  channelSourceMappingPage : any;
  channelSourcePage : any;
  agentTemplateMappingPage : any;

  roleBasedAccess() {
    this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
      this.roleBasedAccessModule = result;
      [...this.roleBasedAccessModule].map(item => {
        if (item.FeatureName === 'Admin_Agent_Page') { this.agentPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_Teams_Page') { this.teamsPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_Roles_Page') { this.rolePage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_Product_Page') { this.productPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_BusinessRules_Page') { this.businessRolesPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_Configuration_Page') { this.configurationPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_EmailNotification_Page') { this.emailNotificationPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_BusinessObject_Page') { this.businessObjectsPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_Templates_Page') { this.templatePage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_Disposition_Pag') { this.dispositionPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_ChannelSourceMapping_Page') { this.channelSourceMappingPage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_ChannelSource_Page') { this.channelSourcePage = item.FeatureStatus; }
        if (item.FeatureName === 'Admin_AgentTemplateMapping_Page') { this.agentTemplateMappingPage = item.FeatureStatus; }
      });
    })
  }
  //End Access permission 
  ngOnDestroy() {
    this.subscriptionRoleModule?.unsubscribe();
  }


}
