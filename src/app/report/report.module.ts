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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../service/excel.service';
import { NgxSummernoteModule } from 'ngx-summernote';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsModule } from '../settings/settings.module';
import { RoleModule } from '../roleModule/roleModule.module';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from '../admin/admin.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppRoutingModule } from '../app-routing.module';
import { ClientModule } from '../client/client.module';

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
    NgbModule,
    NgxSummernoteModule,
    ReactiveFormsModule,
    MatTooltipModule,



    BrowserAnimationsModule,
    SettingsModule,
    RoleModule,
    NgxTablePaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,




    BrowserModule,
    HttpClientModule,
    AdminModule,
    DashboardModule,
    AppRoutingModule,
    ClientModule,
    NgbModule












  ],
  providers:[ExcelService]

})
export class ReportModule { }
