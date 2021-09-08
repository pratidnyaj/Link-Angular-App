import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportHomeComponent } from './report-home/report-home.component';
import { NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    ReportHomeComponent
  ],
  imports: [
    CommonModule,
    NgbAccordionModule
  ]
})
export class ReportModule { }
