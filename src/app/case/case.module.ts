import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseHomeComponent } from './case-home/case-home.component';
import { CaseListComponent } from './case-list/case-list.component';
import { CaseFilterComponent } from './case-filter/case-filter.component';
import { CaseListDisplayComponent } from './case-list-display/case-list-display.component';
import { CaseInfoComponent } from './case-info/case-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { CaseInteractionListComponent } from './case-interaction-list/case-interaction-list.component';
import { PastCaseComponent } from './past-case/past-case.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CaseHomeComponent,
    CaseListComponent,
    CaseFilterComponent,
    CaseListDisplayComponent,
    CaseInfoComponent,
    ContactInfoComponent,
    CaseInteractionListComponent,
    PastCaseComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule
  ],
  exports:[]
})
export class CaseModule { }
