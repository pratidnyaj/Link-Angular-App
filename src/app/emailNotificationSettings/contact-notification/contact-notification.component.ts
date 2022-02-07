import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-contact-notification',
  templateUrl: './contact-notification.component.html',
  styleUrls: ['./contact-notification.component.scss']
})
export class ContactNotificationComponent implements OnInit {
  contactNotification : any = [];
  constructor(private caseService: CaseService ) { }

  ngOnInit(): void {
    this.getcontactNotification();
  }
  getcontactNotification(){
    let req: any = {
      "CategoryName": "EmailNotifications",
      "SubCategoryName": "EmailNotificationsSettings",
      "Type" : "Contact Notifications"
    }
    this.caseService.postData('GetEmailNotification', req).subscribe(result => {
      // if (result.status) {
      //  console.log('Contact Notifications',result)
      // }
      if (result.status) {
        let contactNotificationdata = result.data;
       this.contactNotification = contactNotificationdata.map(vals=>{
         if( vals.ConfigValue == "True" ){
           return { ...vals, isSelected : true
           }  
         }else{
           if( vals.ConfigValue == "False" ){
             return { ...vals, isSelected : false }  
           }
         }
       })
       }
    })
  }
    
}
