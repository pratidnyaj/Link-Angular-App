import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../service/excel.service';
import { CustomizedFieldComponent } from './customized-field/customized-field.component';
import { BrowserModule } from '@angular/platform-browser';
import { ObjectManagerComponent } from './object-manager/object-manager.component';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '../admin/admin.module';
import { HttpClientModule } from '@angular/common/http';
import { ReportModule } from '../report/report.module';
import { CaseModule } from '../case/case.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AppRoutingModule } from '../app-routing.module';
import { ClientModule } from '../client/client.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleModule } from '../roleModule/roleModule.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
 
    CustomizedFieldComponent,
       ObjectManagerComponent
  
  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxTablePaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    RouterModule



    
  ],
  providers:[ExcelService]

})
export class SettingsModule { }
