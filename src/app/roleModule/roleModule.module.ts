import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../service/excel.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { UserMasterComponent } from './user-master/user-master.component';
import { RoleMasterComponent } from './role-master/role-master.component';
import { RolesComponent } from './roles/roles.component';
import { NgxSummernoteModule } from 'ngx-summernote';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RoleMasterComponent } from './role-master/role-master.component';

@NgModule({
  declarations: [
    UserMasterComponent,
    RoleMasterComponent,
    RolesComponent
  
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
    BrowserAnimationsModule,
    NgxSummernoteModule
    
  ]

})
export class RoleModule { }

