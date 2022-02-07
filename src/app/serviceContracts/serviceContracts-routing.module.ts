import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { AddServiceContractsComponent } from './add-service-contracts/add-service-contracts.component';

const routes: Routes = [
    {
        path: 'newServiceContracts',
        component: AddServiceContractsComponent,canActivate: [AuthGuard]
      },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class serviceContractsRoutingModule { }
