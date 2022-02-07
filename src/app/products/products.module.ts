import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExcelService } from '../service/excel.service';
import { AppRoutingModule } from '../app-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxTablePaginationModule } from 'ngx-table-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
// import { EditEmailNotificationTemplateComponent } from './edit-email-notification-template/edit-email-notification-template.component';
// import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxEditorModule } from 'ngx-editor';
import { QuillModule } from 'ngx-quill';
import { NgxSummernoteModule } from 'ngx-summernote';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductslistComponent } from './productslist/productslist.component';

@NgModule({
  declarations: [
    ProductslistComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbAccordionModule,
    NgbModule,
    AppRoutingModule,

    NgSelectModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    NgxTablePaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    BrowserAnimationsModule,
    NgxSummernoteModule,
    NgxEditorModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
      
      }
    })
  
   
    
    
  ],
  providers: [ExcelService]

})
export class ProductsModule { }
