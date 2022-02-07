import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SessionsRoutingModule } from './sessions/sessions-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { adminRoutingModule } from './admin/admin-routing.module';
import { reportRoutingModule } from './report/report-routing.module';
import { caseRoutingModule } from './case/case-routing.module';
import { clientRoutingModule } from './client/client-routing.module';
import { settingsRoutingModule } from './settings/settings-routing.module';
import { TimerModalComponent } from './custom-modal/timer-modal/timer-modal.component';
// import { UserMasterComponent } from './user-master/user-master.component';
// import { RoleMasterComponent } from './roleModule/role-master/role-master.component';
import { RolesComponent } from './roleModule/roles/roles.component';
import { roleModuleRoutingModule } from './roleModule/roleModule-routing.module';
import { emailNotificationRoutingModule } from './emailNotificationSettings/emailNotification-routing.module';
import { productsRoutingModule } from './products/products-routing.module';
import { teamsRoutingModule } from './teams/teams-routing.module';
import { collaboratorsRoutingModule } from './collaborators/collaborators-routing.module';
import { businessRulesRoutingModule } from './businessRules/businessRules-routing.module';
import { serviceContractsRoutingModule } from './serviceContracts/serviceContracts-routing.module';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  // {
  //   path: 'timerModal',
  //   component: UserMasterComponent
  // },
  {
    path: '',       
    children: [
      {
        path: 'login',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule)
      }
    ]
  },
  // {
  //   path: 'user-master',
  //   component: UserMasterComponent
  // },
  // {
  //   path: 'role-master',
  //   component: RoleMasterComponent
  // },
  // {
  //   path: 'roles',
  //   component: RolesComponent
  // },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
    SessionsRoutingModule,
    DashboardRoutingModule,
    adminRoutingModule,
    reportRoutingModule,
    caseRoutingModule,
    clientRoutingModule,
    settingsRoutingModule,
    roleModuleRoutingModule,
    emailNotificationRoutingModule,
    productsRoutingModule,
    teamsRoutingModule,
    collaboratorsRoutingModule,
    businessRulesRoutingModule,
    serviceContractsRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }