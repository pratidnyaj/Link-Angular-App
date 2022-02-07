import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { AccountViewComponent } from './account-view/account-view.component';
import { AccountComponent } from './account/account.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ContactInfoViewComponent } from './contact-info-view/contact-info-view.component';
import { ProductInfoViewComponent } from './product-info-view/product-info-view.component';

const routes: Routes = [
  {
    path: 'client',
    component: ClientHomeComponent,canActivate: [AuthGuard]
  },
  {
    path: 'account',
    component: AccountComponent,canActivate: [AuthGuard]
  },
  {
    path: 'accountView',
    component: AccountViewComponent,canActivate: [AuthGuard]
  },
  {
    path: 'productView/:id',
    component: ProductInfoViewComponent,canActivate: [AuthGuard]
  },
  {
    path: 'contactView/:id',
    component: ContactInfoViewComponent,canActivate: [AuthGuard]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clientRoutingModule { }
