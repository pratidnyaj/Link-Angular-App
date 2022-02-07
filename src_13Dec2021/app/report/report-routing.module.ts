import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { ReportHomeComponent } from './report-home/report-home.component';

const routes: Routes = [
  {
    path: 'report',
    component: ReportHomeComponent,canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class reportRoutingModule { }
