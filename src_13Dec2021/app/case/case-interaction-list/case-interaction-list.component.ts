import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'src/app/service/report.service';
import { Router } from '@angular/router';
declare const $: any;


@Component({
  selector: 'app-case-interaction-list',
  templateUrl: './case-interaction-list.component.html',
  styleUrls: ['./case-interaction-list.component.scss']
})
export class CaseInteractionListComponent implements OnInit {
  closeResult: string = '';
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

  message: string = "";
  subscriptions: Subscription | undefined;

  teamsData: any[] = [];
  selectedTeam: string = "";

  agentsData: any[] = [];
  selectedAgent: any = [];
  selectedAgentName: string = "";

  CloseRemark: string = "";

  disposition: string = "0";
  subDisposition: string = "0";
  subsubDisposition: string = "0";

  constructor(private caseService: CaseService, private toastr: ToastrService, private modalService: NgbModal,
    private ReportService: ReportService, private router: Router) {

  }

  ngOnInit(): void {
    this.subscription = this.caseService.observeDrpData().subscribe(data => {
      this.disposition = data.disposition;
      this.subDisposition = data.SubDisposition;
      this.subsubDisposition = data.SubSubDisposition;
    });
    this.subscription = this.caseService.observeCaseData().subscribe(message => {
      this.selectedCase = message;
      this._getCaseInteractionHistory(message);
      this._getMailBoxInfo(message);
      this.drowpdownSelectedData()

    });
    //---- Start Bind teams dropdown---//
    let ReqparameterTeams =
    {
      "TeamId": "",
      "UserId": "",
      "Flag": "Teams"
    }
    this.ReportService.postData('GetTeamsData', ReqparameterTeams)
      // this.ReportService.getTeamsData(ReqparameterTeams)
      .subscribe((res) => {
        this.teamsData = res.data;
        console.log(this.teamsData);
      });
    //---end Bind teams dropdown---//
    this.popupModalClose();
    this.roleBasedAccess();
  }

  ngAfterViewInit() {
    this.divInxHistScrollRef = this.divInxHistScrollEl?.nativeElement;
  }

  private _getCaseInteractionHistory(oMessage: any) {
    this.isCaseInteractionBlur = true;
    let caseInteractionHistoryRq = {
      "caseId": oMessage.caseid,
    };


    this.caseService.postData('caseHistory', caseInteractionHistoryRq)
      // this.caseService.getCaseInteractionHistory(caseInteractionHistoryRq)
      .subscribe(
        data => {
          this.caseInteractions = data.data; },
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
    this.caseService.postData('mailBox', mailBoxRq).subscribe(data => {
      // this.caseService.getMailBoxInfo(mailBoxRq).subscribe(data => {
      this.arrMailBox = data.data;
    });
  }

  private _processReplyOperation(inxHistory: any, replyType: string) {
    this.selectedInteractionId = inxHistory.InteractionID;
    console.log('122===================>', this.selectedInteractionId);

    this.oReply.interactionReplyType = replyType;

    this.oReply.channelId = 20;
    this.oReply.channelName = "CaseNote";

    if (replyType == "Reply" || replyType == "ReplyAll") {
      this.oReply.channelId = 1;
      this.oReply.channelName = "Email";
    }


    this.oReply.interactionId = inxHistory.InteractionID;
    console.log("this.oReply.interactionId---", this.oReply.interactionId)
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
console.log('211===========================================>',data);
    let interactionRq = {
      "interactionDes": data.description,
      "Subject": data.subject,
      "caseid": _caseId,
      "CCMail": data.arrCcEmail || null,
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
      "subdisposition": this.subDisposition,
      "subsubdisposition": this.subsubDisposition,
      "ReplyType": (data.interactionReplyType != 'CaseNote') ? "Interaction" : "",
      "ReplyID": (data.interactionReplyType != 'CaseNote') ? data.interactionId : "",
      "MailBox": data.selectedFromEmail?.SupportEmail || null,
      "AgentEmailAddress": JSON.parse(oLoggedInUser).EmailID,
      "IntrRequestOrigin": "API"
    };
    //console.log(interactionRq);
    this.caseService.postData('sendMail', interactionRq).subscribe(data => {
      // this.caseService.createInteraction(interactionRq).subscribe(data => {
      if (data.status) {
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
    let reqObj = {
      "CaseId": caseId,
      "AssignedToAgent": userId,
      "UpdatedBy": userId,
      "EvntPerformerType": "agent",
      "AssignedToTeam": ""
    }
    console.log('272============================>', reqObj);

    this.caseService.postData('assignCaseToSelfApi', reqObj).subscribe(
      data => {
        if (data.status) {
          this.toastr.success('Case assigned to self');
          this.closeResult = `Dismissed ${this.getDismissReason('Cross click')}`;
          this.router.navigateByUrl('/case');
          this.caseService.caselistReload();
        }
        else {
          this.toastr.error('Case assigned to self failed');
        }
      },
      error => console.log('assignCaseToMe', error?.message))
      .add(() => {
        this.caseService.syncCaseId(caseId);
      });
    this.selectedTeam = "";
    this.selectedAgentName = "";
    this.selectedAgent = [];
  }

  CloseCaseModalOpen(longContent: any) {
    this.CloseRemark = "";
    this.modalService.open(longContent, { scrollable: true, centered: true, size: 'sm' });
  }

  CaseAsBlockedModalOpen(longContent: any) {
    this.modalService.open(longContent, { scrollable: true, centered: true, size: 'sm' });
  }

  CloseCase(longContent: any) {
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let caseId = this.selectedCase.caseid;
    let userId = JSON.parse(oLoggedInUser).UserID;
    let AgentEmailAddress = JSON.parse(oLoggedInUser).EmailID
    this.caseService.syncCaseId(this.selectedCase.caseid);

    let rquest = {
      "caseId": [
        caseId
      ],
      "userType": JSON.parse(oLoggedInUser).UserType,
      "disposition": this.disposition,
      "subdisposition": this.subDisposition,
      "subsubdisposition": this.subsubDisposition,
      "Remarks": this.CloseRemark,
      "IntrRequestOrigin": "API",
      "UserID": userId
    }
    //alert('Close Case');
    console.log(rquest);

    this.caseService.postData('closeCaseApi', rquest).subscribe(
      // this.caseService.CaseClose(rq).subscribe(
      data => {
        console.log('data------------------)))))====', data.message)
        if (data.status) {
          this.toastr.success(data.message);
          // this.router.navigateByUrl('/case');
          this.caseService.caseListFilterReload('closeCase');
        }
        else {
          this.toastr.error('Failed to Close the case.');
        }
      },
      error => console.log('Caseclose', error?.message))
      .add(() => {
        this.caseService.syncCaseId(caseId);
      });
  }

  MarkCaseAsSpam() {
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let caseId = this.selectedCase.caseid;
    let userId = JSON.parse(oLoggedInUser).UserID;

    let request = {
      "caseId": [
        caseId
      ],
      "userType": "agent",
      "disposition": "0",
      "subdisposition": "0",
      "subsubdisposition": "0",
      "junkRemarks": "Marked as Spam, Sender Blocked.",
      "blockStatus": true,
      "userID": userId
    };
    this.caseService.postData('spamCaseApi', request).subscribe(
      //this.caseService.postData('MarkSpam', rq).subscribe(
      // this.caseService.markCaseAsSpam(rq).subscribe(
      data => {
        if (data.status) {
          this.toastr.success(data.message);
          this.caseService.caseListFilterReload('closeCase');
        }
        else {
          this.toastr.error('Case marked as Spam failed.');
        }
      },
      error => console.log('markCaseAsSpam', error?.message))
      .add(() => {
        this.caseService.syncCaseId(caseId);
      });
  }

  MarkCaseAsBlocked() {
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let caseId = this.selectedCase.caseid;
    let userId = JSON.parse(oLoggedInUser).UserID;
    this.caseService.syncCaseId(this.selectedCase.caseid);
    // this.modalService.open(longContent, { scrollable: true, centered: true, size: 'sm' });

    let request = {
      "caseId": [
        caseId
      ],
      "userType": "agent",
      "disposition": "0",
      "subdisposition": "0",
      "subsubdisposition": "0",
      "blockRemarks": "Marked as Block, domain not blocked.",
      "blockDomain": false,
      "userID": userId
    };
    this.caseService.postData('blockCaseApi', request).subscribe(
      // this.caseService.postData('MarkBlock', rq).subscribe(
      // this.caseService.markCaseAsBlock(rq).subscribe(
      data => {
        if (data.status) {
          this.toastr.success(data.message);
          this.caseService.caseListFilterReload('closeCase');
        }
        else {
          this.toastr.error('Failed to Block.');
        }
      },
      error => console.log('markCaseAsSpam', error?.message))
      .add(() => {
        this.caseService.syncCaseId(caseId);
      });
  }


  AssignCase() {
    // 
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let caseId = this.selectedCase.caseid;
    let userId = JSON.parse(oLoggedInUser).UserID;
    let teamId = this.selectedTeam;
    let agentId = (this.selectedAgent.UserID) ? this.selectedAgent.UserID : "";

    if (this.selectedTeam == "") {
      this.toastr.warning('Please Select Team');
    } else {
      var reqObj = {
        "CaseId": caseId,
        "AssignedToAgent": agentId,
        "UpdatedBy": userId,
        "EvntPerformerType": "agent",
        "AssignedToTeam": teamId

      }


      this.caseService.postData('assignCaseToAgentApi', reqObj).subscribe(
        data => {
          if (data.status) {
            this.toastr.success('Case assigned successfully');
            this.router.navigateByUrl('/case');
            this.caseService.caselistReload();
            $('#AssignCaseModal').modal('hide')
          }
          else {
            this.toastr.error('Case assign failed');
            $('#AssignCaseModal').modal('hide')
          }
        },
        error => console.log('assignCase', error?.message))
        .add(() => {
          this.caseService.syncCaseId(caseId);
        });

      this.selectedTeam = "";
      this.selectedAgent = [];
      this.selectedAgentName = "";
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.data.currentValue);
  }

  public onChangeTeams(event: any[]): void {
    // 
    if (event.length == 0) {
      this.agentsData = [];
    }
    console.log(event);
    let ReqparameterAgents =
    {
      "TeamId": event,
      "UserId": "",
      "Flag": "Agents"
    }
    this.ReportService.postData('GetAgentsData', ReqparameterAgents)
      // this.ReportService.getAgentsData(ReqparameterAgents)
      .subscribe((res) => {
        this.agentsData = [];
        this.agentsData = res.data;
        console.log(this.agentsData);
      });

  }

  public onChangeAgents(event: any[]): void {
    // 

    this.selectedAgentName = this.selectedAgent.FullName;
  }
  //#endregion
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
    this.subscriptionRoleModule?.unsubscribe();
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openassignstatus(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  ClosePopup() {
    // 

    $('#AssignCaseModal').modal('hide')
    this.closeResult = `Dismissed ${this.getDismissReason(ModalDismissReasons.BACKDROP_CLICK)}`;

  }
  mergeContent(longContent: any) {
    this.modalService.open(longContent, { scrollable: true });
  }
  meregcases(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  mergecase() {
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let mergecaseId = ""; //.selectedCase.caseid;
    let parentcaseId = "";//JSON.parse(oLoggedInUser).UserID;
    let userId = JSON.parse(oLoggedInUser).UserID;

    this.caseService.mergecase(mergecaseId, parentcaseId, userId).subscribe(
      data => {
        if (data.status) {
          this.toastr.success('Case merged successfully');
        }
        else {
          this.toastr.error('Case merged failed');
        }
      },
      error => console.log('mergecase', error?.message))

  }
  sideconversation(longContent: any) {
    this.modalService.open(longContent, { scrollable: true, centered: true });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



  // custom modal 
  showIt: boolean = true;
  mergeWith: boolean = true;

  showModal() {
    this.showIt = false;
    this.caseService.casepopupModal('pushNotificationModal');

  }
  // closeModal() {
  //   this.showIt = false;
  //   this.mergeWith = false;

  // }

  // for open and close merge with modal
  mergeModal() {
    this.mergeWith = false;
    this.caseService.casepopupModal('mergeModal');

  }

  // to close custom modal
  popupModalClose() {
    this.caseService.modalInactive.subscribe(() => {
      this.showIt = true;// push notification modal
      this.mergeWith = true;// merge with modal
    })
  }

  drowpdownSelectedData (){

    this.subscription = this.caseService.observeDrpData().subscribe(data => {

      this.disposition = data.selectedDisposition;
      this.subDisposition = data.selectedSubdisposition;
      this.subsubDisposition = data.selectedsubsubdisposition;
    });

  }



//Role based access permission 

  roleBasedAccessModule : any = [];
  spamCasesRole : any;
  blockCasesRole : any;
  closeOwnCasesRole:any;
  pickupOwnCasesRole:any;
  routeOwnCasesRole:any;
  caseReplayAllAccessRole : any;
  caseAddNoteAccessRole : any;
  subscriptionRoleModule: Subscription | undefined;
  roleBasedAccess(){
  this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
console.log('captrue Role base assess ==abhi== >',result)

this.roleBasedAccessModule = result;


[...this.roleBasedAccessModule].map(item => { 
  if(item.FeatureName === 'CASE_SpamCases'){
    this.spamCasesRole = item.FeatureStatus; 
  }
  else if(item.FeatureName === 'CASE_BlockCases'){
    this.blockCasesRole = item.FeatureStatus; 
  }
  else if(item.FeatureName === 'CASE_CloseOwnCases'){
    this.closeOwnCasesRole = item.FeatureStatus; 
  }
  else if(item.FeatureName === 'CASE_PickupOwnCase'){
    this.pickupOwnCasesRole = item.FeatureStatus; 
  }
  else if(item.FeatureName === 'CASE_AssignOwnCases'){
    this.routeOwnCasesRole = item.FeatureStatus; 
  }
  
  else if(item.FeatureName === 'CASE_Reply_All'){
    this.caseReplayAllAccessRole = item.FeatureStatus; 
  }
  else if(item.FeatureName === 'CASE_Add_Note'){
    this.caseAddNoteAccessRole = item.FeatureStatus; 
  }
 });

//   for(let i=0;i<this.roleBasedAccessModule.length;i++){
// if(this.roleBasedAccessModule[i].FeatureName === 'Spam Cases'){
//   console.log('samp case');
  
//   this.spamCasesRole = this.roleBasedAccessModule[i].FeatureStatus; 
// }
// else if(this.roleBasedAccessModule[i].FeatureName === 'Block Cases'){
//   this.blockCasesRole = this.roleBasedAccessModule[i].FeatureStatus; 
// }
// else if(this.roleBasedAccessModule[i].FeatureName === 'Close Own Cases'){
//   this.closeOwnCasesRole = this.roleBasedAccessModule[i].FeatureStatus; 
// }
// else if(this.roleBasedAccessModule[i].FeatureName === 'Pickup Own Cases'){
//   this.pickupOwnCasesRole = this.roleBasedAccessModule[i].FeatureStatus; 
// }
// else if(this.roleBasedAccessModule[i].FeatureName === 'Route Own Cases'){
//   this.routeOwnCasesRole = this.roleBasedAccessModule[i].FeatureStatus; 
// }
//   }

  })

}
  
//End role based access permission 

}

