import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  isCaseInteractionBlur: boolean = false;
  isEditorBlur: boolean = false;

  subscription: Subscription | undefined;
  @ViewChild('divInxHistScroll') divInxHistScrollEl?: ElementRef;
  private divInxHistScrollRef: any;

  message:string="";
  subscriptions: Subscription | undefined;

  constructor(private caseService: CaseService, private toastr: ToastrService) {

  }

  ngOnInit(): void {

    this.subscription = this.caseService.observeCaseData().subscribe(message => {
      this.selectedCase = message;

      this._getCaseInteractionHistory(message);
      this._getMailBoxInfo(message);
    });
  }

  ngAfterViewInit() {
    this.divInxHistScrollRef = this.divInxHistScrollEl?.nativeElement;
  }

  private _getCaseInteractionHistory(oMessage: any) {
    this.isCaseInteractionBlur = true;
    let caseInteractionHistoryRq = {
      "caseId": oMessage.caseid,
    };

    this.caseService.getCaseInteractionHistory(caseInteractionHistoryRq)
      .subscribe(
        data => { this.caseInteractions = data.data; },
        error => console.log('getCaseInteractionHistory', error?.message))
      .add(() => {
        this.isCaseInteractionBlur = false;
        this.selectedInteractionId = 0;
        this.divInxHistScrollRef.scrollTop = 0;
      });
  }

  private _getMailBoxInfo(oMessage: any) {
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";

    let mailBoxRq = {
      "caseId": oMessage.caseid,
      "userId": JSON.parse(oLoggedInUser).UserID,
    };

    this.caseService.getMailBoxInfo(mailBoxRq).subscribe(data => {
      this.arrMailBox = data.data;
    });
  }

  private _processReplyOperation(inxHistory: any, replyType: string) {

    this.selectedInteractionId = inxHistory.InteractionID;

    this.oReply.interactionReplyType = replyType;

    this.oReply.channelId = 20;
    this.oReply.channelName = "CaseNote";

    if (replyType == "Reply" || replyType == "ReplyAll") {
      this.oReply.channelId = 1;
      this.oReply.channelName = "Email";
    }


    this.oReply.interactionId = inxHistory.InteractionID;
    this.oReply.caseId = inxHistory.CaseID;

    this.oReply.arrCcEmail = [];
    this.oReply.selectedCcEmail = [];

    this.oReply.arrFromEmail = [];
    this.oReply.selectedFromEmail = {};

    this.oReply.arrToEmail = [];
    this.oReply.selectedToEmail = [];

    this.oReply.subject = inxHistory.Subject;
    this.oReply.description = "";
    this.oReply.emailSourceAccount = inxHistory.EmailSourceAccount;

    this.oReply.arrFromEmail = this.arrMailBox;

    if (replyType != "CaseNote") {

      if (this.arrMailBox.length > 0) {
        for (let eml of this.arrMailBox) {
          if (eml.SupportEmail == inxHistory.EmailSourceAccount) {
            this.oReply.selectedFromEmail = eml;
          }
        }
      }

      if (inxHistory.EmailTo) {
        if (inxHistory.RequesterUserType != "agent") {
          //check : inxHistory.EmailFrom
          this.oReply.arrToEmail = inxHistory.EmailFrom.split(',');
          this.oReply.selectedToEmail = this.oReply.arrToEmail;
        }
        else {
          this.oReply.arrToEmail = inxHistory.EmailTo.split(',');
          this.oReply.selectedToEmail = this.oReply.arrToEmail;
        }
      }

      if (inxHistory.Cc && replyType == "ReplyAll") {
        this.oReply.arrCcEmail = inxHistory.Cc.split(',');
        this.oReply.selectedCcEmail = this.oReply.arrCcEmail;
      }
    }

  }

  Reply(inxHistory: any) {
    this._processReplyOperation(inxHistory, "Reply");
  }

  ReplyAll(inxHistory: any) {
    this._processReplyOperation(inxHistory, "ReplyAll");
  }

  emailEditorEventHandler($event: any) {
    let action = $event.action;
    let data = $event.data;

    if (action == "discard") {
      this.selectedInteractionId = 0;
    }

    if (action == "send") {
      this._createInteraction(data);
    }

  }

  private _createInteraction(data: any) {
    this.isEditorBlur = true;
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let _caseId = data.caseId;

    let interactionRq = {
      "interactionDes": data.description,
      "Subject": data.subject,
      "caseid": _caseId,
      "CCMail": data.selectedCcEmail || null,
      "channel": data.channelId,
      "visibility": (data.interactionReplyType != 'CaseNote') ? true : false,
      "contactId": "",
      "EmailContact": (data.interactionReplyType != 'CaseNote') ? data.selectedToEmail.join() : "",
      "ChannelName": data.channelName,
      "userType": "agent",
      "UploadFileNames": [],
      "sessionId": "" + new Date().getTime() + data.interactionId,
      "saveFrom": "agent",
      "direction": "1",
      "subdisposition": "1",
      "subsubdisposition": null,
      "ReplyType": (data.interactionReplyType != 'CaseNote') ? "Interaction" : "",
      "ReplyID": (data.interactionReplyType != 'CaseNote') ? data.interactionId : "",
      "MailBox": data.selectedFromEmail?.SupportEmail || null,
      "AgentEmailAddress": JSON.parse(oLoggedInUser).EmailID,
      "IntrRequestOrigin": "API"
    };

    //console.log(interactionRq);

    this.caseService.createInteraction(interactionRq).subscribe(data => {
      if (data.Result == "Success") {
        //Refresh the Interaction History...
        this.toastr.success('Mail Sent.');
        this._getCaseInteractionHistory({ "caseid": _caseId });
      }
      else {
        alert('Interaction Failed...')
      }

    }).add(() => {
      this.isEditorBlur = false;
    });

  }

  //#region Operations
  AddCaseNote() {
    this.selectedInteractionId = this.caseInteractions[0].InteractionID;
    this._processReplyOperation(this.caseInteractions[0], "CaseNote");
  }

  AssignCaseToMe() {
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let caseId = this.selectedCase.caseid;
    let userId = JSON.parse(oLoggedInUser).UserID;

    this.caseService.assignCaseToMe(caseId, userId).subscribe(
      data => 
      {      
        if (data.Result == "Success") {
          this.toastr.success('Case assigned to self');          
        }
        else {
          this.toastr.error('Case assigned to self failed');
        }
      },
      error => console.log('assignCaseToMe', error?.message))
      .add(() => {
        this.caseService.syncCaseId(caseId);
      });

    console.log(caseId, userId);
  }

  CloseCase() {    
    alert('Close Case');
    this.caseService.syncCaseId(this.selectedCase.caseid);
  }

  MarkCaseAsSpam() {
    alert('Mark Spam');
    this.caseService.syncCaseId(this.selectedCase.caseid);
  }

  MarkCaseAsBlocked() {
    alert('Mark Block');
    this.caseService.syncCaseId(this.selectedCase.caseid);
  }
  //#endregion
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
  }

}