import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportHomeComponent } from './report-home/report-home.component';
import { NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CaseLevelReportComponent } from './case-level-report/case-level-report.component';
import { InteractionReportComponent } from './interaction-report/interaction-report.component';
import { AgentPerformanceReportComponent } from './agent-performance-report/agent-performance-report.component';
import { ReportFilterComponent } from './report-filter/report-filter.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ExcelService } from '../service/excel.service';

@NgModule({
  declarations: [
    ReportHomeComponent,
    CaseLevelReportComponent,
    InteractionReportComponent,
    AgentPerformanceReportComponent,
    ReportFilterComponent
  
  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    NgbModule

  ],
  providers:[ExcelService]

})
export class ReportModule { }
