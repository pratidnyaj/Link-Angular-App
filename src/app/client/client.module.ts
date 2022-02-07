import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientFilterComponent } from './client-filter/client-filter.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientCasesComponent } from './client-cases/client-cases.component';
import { NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelService } from '../service/excel.service';
import { AccountComponent } from './account/account.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSummernoteModule } from 'ngx-summernote';
import { AccountViewComponent } from './account-view/account-view.component';
import { ProductInfoViewComponent } from './product-info-view/product-info-view.component';
import { ContactInfoViewComponent } from './contact-info-view/contact-info-view.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { AdminModule } from '../admin/admin.module';
import { ReportModule } from '../report/report.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppRoutingModule } from '../app-routing.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientFilterComponent,
    ClientListComponent,
    ClientInfoComponent,
    ClientCasesComponent,
    CreateContactComponent,
    AccountComponent,
    AccountViewComponent,
    ProductInfoViewComponent,
    ContactInfoViewComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbAccordionModule,
    NgbModule,
    // InfiniteScrollModule

    RouterModule,


    


    NgSelectModule,
    FormsModule,
    BrowserModule,
    NgxTablePaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    BrowserAnimationsModule,
    NgxSummernoteModule,
    



    // MatFormFieldModule,
    // MatInputModule



    // MatTooltipModule,  
    // HttpClientModule,
    // AdminModule,
    // ReportModule,
    // DashboardModule,
    // AppRoutingModule,
  


    CommonModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    NgxSummernoteModule,
    NgbAccordionModule,
    ReactiveFormsModule,
    MatTooltipModule,    BrowserAnimationsModule,
  
    NgxTablePaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    BrowserModule,
    NgbModule,

    MatDatepickerModule,
    MatNativeDateModule,
    // Ng2SearchPipeModule

    Ng2SearchPipeModule

  ],
  providers: [ExcelService]

})
export class ClientModule { }
