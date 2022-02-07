import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { RoleMasterComponent } from './role-master/role-master.component';
import { RolesComponent } from './roles/roles.component';
import { UserMasterComponent } from './user-master/user-master.component';

const routes: Routes = [
 {
    path: 'agents',
    component: UserMasterComponent,canActivate: [AuthGuard]
  },
  {
    path: 'role-master',
    component: RoleMasterComponent,canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    component: RolesComponent,canActivate: [AuthGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class roleModuleRoutingModule { }

