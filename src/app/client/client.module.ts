import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientFilterComponent } from './client-filter/client-filter.component';
import { ClientListComponent } from './client-list/client-list.component';



@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientFilterComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ClientModule { }
