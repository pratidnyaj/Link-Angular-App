import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_helpers/PasswordValidator/auth.guard';
import { EditEmailNotificationTemplateComponent } from './edit-email-notification-template/edit-email-notification-template.component';
import { HomeNotificationComponent } from './home-notification/home-notification.component';

const routes: Routes = [
    {
        path: 'emailnotificationSettings',
        component: HomeNotificationComponent,canActivate: [AuthGuard]
      },
      {
        path: 'notificationTemplate',
        component: EditEmailNotificationTemplateComponent,canActivate: [AuthGuard]
      }

      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class emailNotificationRoutingModule { }
