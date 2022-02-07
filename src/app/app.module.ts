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
// import { UserMasterComponent } from './user-master/user-master.component';

import { NgxTablePaginationModule } from "ngx-table-pagination";
// import { RoleMasterComponent } from './roleModule/role-master/role-master.component';
// import { RolesComponent } from './roleModule/roles/roles.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { RoleModule } from './roleModule/roleModule.module';

import { EmailNotificationModule } from './emailNotificationSettings/emailNotification.module';
import { QuillModule } from 'ngx-quill';
import { NgxSummernoteModule } from 'ngx-summernote';
import { ProductsModule } from './products/products.module';
import { TeamsModule } from './teams/teams.module';
import { CollaboratorsListComponent } from './collaborators/collaborators-list/collaborators-list.component';
import { BusinessRulesModule } from './businessRules/businessRules.module';
import { AddBusinessRulesComponent } from './businessRules/add-business-rules/add-business-rules.component';
import { ServiceContractsModule } from './serviceContracts/serviceContracts.module';
// import { TeamslistComponent } from './teams/teamslist/teamslist.component';
// import { TeamsViewComponent } from './teams/teams-view/teams-view.component';


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
    TimerModalComponent,
    CollaboratorsListComponent,
    AddBusinessRulesComponent
    
   
    // UserMasterComponent,
    // RoleMasterComponent,
    // RolesComponent
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
    SettingsModule,
    RoleModule,
    ServiceContractsModule,
    NgxTablePaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EmailNotificationModule,
    NgxSummernoteModule,
    ProductsModule,
    TeamsModule,
    QuillModule.forRoot()
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }