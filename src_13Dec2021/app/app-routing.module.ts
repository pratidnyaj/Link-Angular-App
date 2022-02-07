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
import { UserMasterComponent } from './user-master/user-master.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'timerModal',
    component: UserMasterComponent
  },
  {
    path: '',       
    children: [
      {
        path: 'login',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule)
      }
    ]
  },
  {
    path: 'user-master',
    component: UserMasterComponent
  },
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
    settingsRoutingModule
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }