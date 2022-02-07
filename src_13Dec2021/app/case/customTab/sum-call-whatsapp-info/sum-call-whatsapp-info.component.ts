import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-sum-call-whatsapp-info',
  templateUrl: './sum-call-whatsapp-info.component.html',
  styleUrls: ['./sum-call-whatsapp-info.component.scss']
})
export class SumCallWhatsappInfoComponent implements OnInit {

  constructor(private caseService : CaseService) { }

  ngOnInit(): void {
    this.roleBasedAccess();
  }

  //Role base access permission Module
  roleBasedAccessModule : any = [];
  subscriptionRoleModule: Subscription | undefined;
  callLogSmsAccessModule : any;
  callLogWhatsAppAccessModule : any;
  callLogsCallsAccessModule : any;
  roleBasedAccess(){
this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
this.roleBasedAccessModule = result;
console.log('SMS Call   1111 =====> 293',result);
 [...this.roleBasedAccessModule].map(item => { 
   if(item.FeatureName === 'CASE_CallLogsSms'){this.callLogSmsAccessModule = item.FeatureStatus;}
  else if(item.FeatureName === 'CASE_CallLogsWhatsapp'){this.callLogWhatsAppAccessModule = item.FeatureStatus;}
  else if(item.FeatureName === 'CASE_CallLogsCall'){this.callLogsCallsAccessModule = item.FeatureStatus;}
});
  })
}
//End Access permission 
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionRoleModule?.unsubscribe();
  }


}
