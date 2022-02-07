import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';
@Component({
  selector: 'app-agent-notification',
  templateUrl: './agent-notification.component.html',
  styleUrls: ['./agent-notification.component.scss']
})
export class AgentNotificationComponent implements OnInit {
  agentNotification : any =[];
  constructor(private caseService: CaseService ) { }

  ngOnInit(): void {
  this.getagentNotification();
  }
  getagentNotification(){



let req: any = {
  "CategoryName": "EmailNotifications",
  "SubCategoryName": "EmailNotificationsSettings",
  "Type" : "Agent Notifications"
}
this.caseService.postData('GetEmailNotification', req).subscribe(result => {
  if (result.status) {

   let agentNotificationdata = result.data;
  this.agentNotification = agentNotificationdata.map(vals=>{
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
