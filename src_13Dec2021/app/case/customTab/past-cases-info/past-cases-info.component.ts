import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-past-cases-info',
  templateUrl: './past-cases-info.component.html',
  styleUrls: ['./past-cases-info.component.scss']
})
export class PastCasesInfoComponent implements OnInit {
  subscription: Subscription | undefined;
  subscriptionEmitCaseID: Subscription | undefined;
  subscriptionCaseID: Subscription | undefined;
  pastCases: Array<any>;
  newcaseId: boolean = true;
  constructor(private caseService: CaseService) {
    this.pastCases = new Array<any>();
  }
  kk = true;
  ngOnInit() {
    this.getcaseId()
  }

  getcaseId() {
    if (this.newcaseId) {
      this.subscriptionCaseID = this.caseService.previewCaseID.subscribe((data) => {
        this.getPastCases(data)
        this.newcaseId = false;
      })
    }
    this.subscriptionEmitCaseID = this.caseService.observeCaseData().subscribe(
      message => {
        if (!this.newcaseId) {
        this.getPastCases(message.caseid)
        }
      })
  }
  getPastCases(data: any) {
    let ReqparameterPastCase: any =
    {
      "caseid": data
    }
    this.subscription = this.caseService.postData('GetPastCases', ReqparameterPastCase).subscribe(
      data => {
        console.log(data);
         this.pastCases = data.data;
      }, error => console.log('GetPastCases', error?.message))
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
    this.subscriptionEmitCaseID?.unsubscribe();
    this.subscriptionCaseID?.unsubscribe();
  }
}
