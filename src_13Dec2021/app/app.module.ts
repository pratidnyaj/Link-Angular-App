import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminModule } from './admin/admin.module';
import { ReportModule } from './report/report.module';
import { CaseModule } from './case/case.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { ClientModule } from './client/client.module';
import { NgbModule , NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterCasesPipe } from './shared/pipes/filter-cases.pipe';
import { SafeHtmlPipe } from './case/case-interaction-list/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ExcelService } from './service/excel.service';
import { NewCaseModalComponent } from './case/new-case-modal/new-case-modal.component';
import { ContactCaseModalComponent } from './case/contact-case-modal/contact-case-modal.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { FirebaseNotificationComponent } from './shared/firebase-notification/firebase-notification.component';
import { WebEngagementComponent } from './web-engagement/web-engagement.component';
import { KonwledgeManagerComponent } from './konwledge-manager/konwledge-manager.component';
import { ReminderComponent } from './reminder/reminder.component';

import { BlockCaseComponent } from './block-case/block-case.component';
import { KnowledgeManagerDetailsComponent } from './knowledge-manager-details/knowledge-manager-details.component';
import { ChartDashboardComponent } from './chart-dashboard/chart-dashboard.component';
import { InactivityTimerComponent } from './inactivity-timer.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { CustomizedFieldComponent } from './settings/customized-field/customized-field.component';
import { SettingsModule } from './settings/settings.module';
import { TimerModalComponent } from './custom-modal/timer-modal/timer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewCaseModalComponent,
    ContactCaseModalComponent,
    SidebarComponent,
    FilterCasesPipe,
    FirebaseNotificationComponent,
    WebEngagementComponent,
    KonwledgeManagerComponent,
    ReminderComponent,
    BlockCaseComponent,
    KnowledgeManagerDetailsComponent,
    ChartDashboardComponent,
    InactivityTimerComponent,
    NotificationListComponent,
    TimerModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    AdminModule, 
    ReportModule, 
    CaseModule, 
    DashboardModule, 
    AppRoutingModule, 
    ClientModule, 
    NgbModule,
    NgxPaginationModule,
    NgSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbAccordionModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    SettingsModule
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }