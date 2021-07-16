import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardHomeComponent } from './dashboard/dashboard-home/dashboard-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { ReportHomeComponent } from './report/report-home/report-home.component';
import { CaseHomeComponent } from './case/case-home/case-home.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardHomeComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'report', component: ReportHomeComponent },
  { path: 'case', component: CaseHomeComponent },
  { path: 'client', component: ClientHomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }