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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafeHtmlPipe } from './case-interaction-list/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSummernoteModule } from 'ngx-summernote';
import { CaseDispSubdispSubdispComponent } from './case-disp-subdisp-subdisp/case-disp-subdisp-subdisp.component';
import { ExcelService } from '../service/excel.service';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InteractionDispositionComponent } from './interaction-disposition/interaction-disposition.component';
import { CustomerAppointmentComponent } from './customTab/customer-appointment/customer-appointment.component';
import { PastCasesInfoComponent } from './customTab/past-cases-info/past-cases-info.component';
import { SideConversationComponent } from './customTab/side-conversation/side-conversation.component';
import { SumCallWhatsappInfoComponent } from './customTab/sum-call-whatsapp-info/sum-call-whatsapp-info.component';
import { NotifyModalComponent } from '../custom-modal/notify-modal/notify-modal.component';
import { MergeModalComponent } from '../custom-modal/merge-modal/merge-modal.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { RoleModule } from '../roleModule/roleModule.module';
import { SettingsModule } from '../settings/settings.module';
import { ClientModule } from '../client/client.module';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ReportModule } from '../report/report.module';
import { AdminModule } from '../admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    CaseHomeComponent,
    CaseListComponent,
    CaseFilterComponent,
    CaseListDisplayComponent,
    CaseInfoComponent,
    ContactInfoComponent,
    CaseInteractionListComponent,
    PastCaseComponent,
    SafeHtmlPipe,
    CaseDispSubdispSubdispComponent,
    InteractionDispositionComponent,
       PastCasesInfoComponent,
    SideConversationComponent,
    CustomerAppointmentComponent,
    SumCallWhatsappInfoComponent,
    NotifyModalComponent,
    MergeModalComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    NgxSummernoteModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    MatTooltipModule,    BrowserAnimationsModule,
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
    ReportModule,
    DashboardModule,
    AppRoutingModule,
    ClientModule,
    NgbModule





  ],
  providers: [ExcelService],
  exports: []
})
export class CaseModule { }
