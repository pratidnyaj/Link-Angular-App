import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { CustomizedFieldComponent } from './customized-field/customized-field.component';
import { ObjectManagerComponent } from './object-manager/object-manager.component';

const routes: Routes = [
  {
    path: 'customizedField',
    component: CustomizedFieldComponent,canActivate: [AuthGuard]
  },
  {
    path: 'ObjectManager',
    component: ObjectManagerComponent,canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class settingsRoutingModule { }

