import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-interaction-list',
  templateUrl: './case-interaction-list.component.html',
  styleUrls: ['./case-interaction-list.component.scss']
})
export class CaseInteractionListComponent implements OnInit {

  caseInteractions: any[] = [];
  selectedCase: any = {};
  selectedInteractionId: number = 0;
  oReply: any = {};
  arrMailBox: any[] = [];

  subscription: Subscription | undefined;

  constructor(private caseService: CaseService) {

  }

  ngOnInit(): void {

    this.subscription = this.caseService.observeCaseData().subscribe(message => {
      this.selectedCase = message;

      this._getCaseInteractionHistory(message);
      this._getMailBoxInfo(message);
    });
  }

  private _getCaseInteractionHistory(oMessage: any) {
    let caseInteractionHistoryRq = {
      "caseId": oMessage.caseid,
    };

    this.caseService.getCaseInteractionHistory(caseInteractionHistoryRq).subscribe(data => {
      this.caseInteractions = data.data;
    });
  }

  private _getMailBoxInfo(oMessage: any) {
    let mailBoxRq = {
      "caseId": oMessage.caseid,
      "userId": "Z69EVN"
    };

    this.caseService.getMailBoxInfo(mailBoxRq).subscribe(data => {
      this.arrMailBox = data.data;
    });
  }

  private _processReplyOperation(inxHistory: any, replyType : string) {

    this.selectedInteractionId = inxHistory.InteractionID;
    this.oReply.interactionReplyType = replyType;

    this.oReply.arrCcEmail = [];
    this.oReply.selectedCcEmail = [];

    this.oReply.arrFromEmail = [];
    this.oReply.selectedFromEmail = [];

    this.oReply.arrToEmail = [];
    this.oReply.selectedToEmail = [];

    this.oReply.subject = inxHistory.Subject;
    this.oReply.emailSourceAccount = inxHistory.EmailSourceAccount;

    this.oReply.arrFromEmail = this.arrMailBox;
    if (this.arrMailBox.length > 0) {
      for (let eml of this.arrMailBox) {
        if (eml.SupportEmail == inxHistory.EmailSourceAccount) {
          this.oReply.selectedFromEmail = eml;
        }
      }
    }

    if (inxHistory.EmailTo) {
      if (inxHistory.RequesterUserType != "agent") 
      {
        //check : inxHistory.EmailFrom
        this.oReply.arrToEmail = inxHistory.EmailFrom.split(',');
        this.oReply.selectedToEmail = this.oReply.arrToEmail;
      }
      else 
      {
        this.oReply.arrToEmail = inxHistory.EmailTo.split(',');
        this.oReply.selectedToEmail = this.oReply.arrToEmail;
      }
    }

    if (inxHistory.Cc && replyType == "ReplyAll") {
      this.oReply.arrCcEmail = inxHistory.Cc.split(',');
      this.oReply.selectedCcEmail = this.oReply.arrCcEmail;
    }
  }

  Reply(inxHistory: any) {
    this._processReplyOperation(inxHistory,"Reply");
  }

  ReplyAll(inxHistory: any) 
  {
    this._processReplyOperation(inxHistory,"ReplyAll");
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
  }

}