import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { CustomizedFieldComponent } from './customized-field/customized-field.component';

const routes: Routes = [
  {
    path: 'customizedField',
    component: CustomizedFieldComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class settingsRoutingModule { }
