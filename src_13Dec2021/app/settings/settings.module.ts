import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from '../service/excel.service';
import { CustomizedFieldComponent } from './customized-field/customized-field.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
 
    CustomizedFieldComponent
  
  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgxPaginationModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers:[ExcelService]

})
export class SettingsModule { }
