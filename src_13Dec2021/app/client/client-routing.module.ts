import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { ClientHomeComponent } from './client-home/client-home.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientHomeComponent,canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clientRoutingModule { }
