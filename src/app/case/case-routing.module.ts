import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimerModalComponent } from '../custom-modal/timer-modal/timer-modal.component';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { CaseHomeComponent } from './case-home/case-home.component';

const routes: Routes = [
  {
    path: 'case',
    component: CaseHomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'timerModal',
    component: TimerModalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class caseRoutingModule { }
