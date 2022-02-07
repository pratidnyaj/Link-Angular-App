import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';
import { TopPerformerComponent } from './top-performer/top-performer.component';



@NgModule({
  declarations: [
    DashboardHomeComponent,
    DashboardStatsComponent,
    TopPerformerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
