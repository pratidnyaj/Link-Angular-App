import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { AddBusinessRulesComponent } from './add-business-rules/add-business-rules.component';

const routes: Routes = [
    {
        path: 'BusinessRules',
        component: AddBusinessRulesComponent,canActivate: [AuthGuard]
      },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class businessRulesRoutingModule { }
