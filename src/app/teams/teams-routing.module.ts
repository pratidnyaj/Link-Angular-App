import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { GetAgentCaseListDetailsComponent } from './get-agent-case-list-details/get-agent-case-list-details.component';
import { TeamAgentListComponent } from './team-agent-list/team-agent-list.component';
import { TeamCasesListComponent } from './team-cases-list/team-cases-list.component';
import { TeamslistComponent } from './teamslist/teamslist.component';

const routes: Routes = [
    {
        path: 'team',
        component: TeamslistComponent,canActivate: [AuthGuard]
      },
      
  {
    path: 'teamAgent/:id',
    component: TeamAgentListComponent,canActivate: [AuthGuard]
  },
  {
    path: 'teamCases/:id',
    component: TeamCasesListComponent,canActivate: [AuthGuard]
  },
  {
    path: 'GetAgentCasesList/:id',
    component: GetAgentCaseListDetailsComponent,canActivate: [AuthGuard]
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class teamsRoutingModule { }
