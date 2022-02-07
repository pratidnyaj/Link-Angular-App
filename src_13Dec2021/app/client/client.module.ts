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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    ClientHomeComponent,
    ClientFilterComponent,
    ClientListComponent,
    ClientInfoComponent,
    ClientCasesComponent,
    CreateContactComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbAccordionModule,
    NgbModule,
    InfiniteScrollModule
  ],
  providers: [ExcelService]

})
export class ClientModule { }
