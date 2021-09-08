import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    FilterCasesPipe
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
    NgbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }