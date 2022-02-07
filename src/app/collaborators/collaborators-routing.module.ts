import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { CollaboratorsListComponent } from './collaborators-list/collaborators-list.component';

const routes: Routes = [
    {
        path: 'collaborators',
        component: CollaboratorsListComponent,canActivate: [AuthGuard]
      },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class collaboratorsRoutingModule { }
