import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { ProductslistComponent } from './productslist/productslist.component';

const routes: Routes = [
    {
        path: 'products',
        component: ProductslistComponent,canActivate: [AuthGuard]
      },
 
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class productsRoutingModule { }
