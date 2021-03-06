import { Component, ElementRef, EventEmitter, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from 'src/app/service/report.service';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';
import * as JSZipUtils from '../../../assets/script/jszip-utils.js';
import * as FileSaver from 'file-saver';
import { file } from 'jszip';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// var serialize = require('serialize-javascript');
declare const $: any;
// import JSZipUtils from "jszip-utils" 
// import JSZipUtils from 'JsZipUtils'

export interface form {
  // id: string;
  formGroup: FormGroup;
  metaData: any[];
  // transactionalData: any[];
}




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

  disposition: string = "1";
  subDisposition: string = "1";
  subsubDisposition: string = "1";


  forms: form[] = [];
fg: FormGroup;
@Output() output: EventEmitter<FormGroup> = new EventEmitter();

  constructor(private caseService: CaseService, private toastr: ToastrService, private modalService: NgbModal,
    private ReportService: ReportService, private router: Router,private formBuilder: FormBuilder) {
      this.fg = new FormGroup({
        formArrayName: this.formBuilder.array([])
      })
  
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
      this.drowpdownSelectedData();
      this.getObjectManager();

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
          this.caseInteractions = data.data;
        },
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
    this.oReply.description = inxHistory.InteractionDesc;
    this.oReply.emailSourceAccount = inxHistory.EmailSourceAccount;

    this.oReply.arrFromEmail = this.arrMailBox;
    // this.oReply.InteractionDesc = inxHistory.InteractionDesc;
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
  arrCcEmail: any;
  
  finalpath:any;
  filePatch : any = [] ;
  replaceFilePatch : any=[];
  private _createInteraction(data: any) {
    this.isEditorBlur = true;
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let _caseId = data.caseId;
    // let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    // new Date().getTime() + data.interactionId
    let frmData = new FormData();    
   frmData.append('userID',  JSON.parse(oLoggedInUser).UserID+data.interactionId )
    // frmData.append('userID', JSON.parse(oLoggedInUser).UserID)
    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append('attachmentsFiles', this.myFiles[i]);
    }
    this.caseService.postDataUpload('uploadInterReq', frmData).subscribe(result => {
      if(result.data.length != 0){
        let fetchData = result.data;   
        fetchData.map(item => {
  this.filePatch.push({
    FileName :item.filename,
    Size : item.size,
    FileType : item.mimetype,
    CategoryID : '1',
    AttachSaveName : item.filename
  })
})

var filePatchStringify=JSON.stringify(this.filePatch)
// debugger;
// console.log("filePatchStringify",filePatchStringify)
//this.replaceFilePatch=filePatchStringify;

//console.log("253",this.replaceFilePatch=filePatchStringify.replace('"',"\""))

this.finalpath = filePatchStringify.replace(/[{]+/g,'"{').replace(/[}]+/g,'}"');

//array to json

//.replace('[','["').replace(']','"]');
// console.log("ffffff",this.finalpath)
 //this.replaceFilePatch = filePatchStringify.replace(/"/g, '"').replace(/{/g,'\"{').replace(/}/g,'\}"')
// this.replaceFilePatch = filePatchStringify.replace(/"/g, '\\\"').replace(/{/g,'\"{').replace(/}/g,'\}"');

 //console.log("replaceFilePatch",this.replaceFilePatch.replace('"[',"[").replace(']"',"]"))
 //var a=JSON.stringify(this.selectFiles)??
  ??// ?? console.log("iiiiiiiiiiiiiiiiiiiiiii",a.replace(/"/g, '\\\"').replace(/{/g,'\"{').replace(/}/g,'\}"'))?? ?? ?? 
    }else{
this.finalpath = [];
    }

    if (this.addCCInteractionCasesRole === undefined) {
      console.log('hahahahaha====>', this.addCCInteractionCasesRole);
      this.arrCcEmail = ''
      // data.arrCcEmail
    } else {
      this.arrCcEmail = data.arrCcEmail
    }
    let interactionRq = {
      "interactionDes": data.description,
      "Subject": data.subject,
      "caseid": _caseId,
      "CCMail": this.arrCcEmail || null,
      "channel": data.channelId,
      "visibility": (data.interactionReplyType != 'CaseNote') ? true : false,
      "contactId": "",
      "EmailContact": (data.interactionReplyType != 'CaseNote') ? data.selectedToEmail.join() : "",
      "ChannelName": data.channelName,
      "userType": "agent",
      "UploadFileNames": this.finalpath,
      "sessionId": "" + JSON.parse(oLoggedInUser).UserID+data.interactionId,
      "saveFrom": "agent",
      "direction": "1",
      "disposition":this.disposition,
      "subdisposition": this.subDisposition,
      "subsubdisposition": this.subsubDisposition,
      "ReplyType": (data.interactionReplyType != 'CaseNote') ? "Interaction" : "",
      "ReplyID": (data.interactionReplyType != 'CaseNote') ? data.interactionId : "",
      "MailBox": data.selectedFromEmail?.SupportEmail || null,
      "AgentEmailAddress": JSON.parse(oLoggedInUser).EmailID,
      "IntrRequestOrigin": "API",
      "UserID": JSON.parse(oLoggedInUser).UserID
    };
// debugger;
console.log("interactionRq",interactionRq)

    // "{\"FileName\":\"MIS_28052021_142933 (1).xlsx\",\"Size\":23430,\"FileType\":\
    // "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\",\"CategoryID\":\"1\",\"AttachSaveName\":\"
    // enxqcoiggnhgj4aot2szlqn41_MIS_28052021_142933 (1).xlsx\"}",





    // let frmData = new FormData();
    // let visibility : any =(data.interactionReplyType != 'CaseNote') ? true : false
    // frmData.append('interactionDes', data.description)
    // frmData.append('Subject', data.subject)
    // frmData.append('caseid', _caseId)
    // frmData.append('CCMail', data.arrCcEmail || null)
    // frmData.append('channel', data.channelId)
    // frmData.append('visibility', visibility)
    // frmData.append('contactId', '')
    // frmData.append('EmailContact', (data.interactionReplyType != 'CaseNote') ? data.selectedToEmail.join() : '')
    // frmData.append('ChannelName', data.channelName)
    // frmData.append('userType', 'agent')
    // frmData.append('UploadFileNames', '[]')
    // frmData.append('sessionId', '' + new Date().getTime() + data.interactionId)
    // frmData.append('saveFrom', 'agent')
    // frmData.append('direction', '1')
    // frmData.append('subdisposition', this.subDisposition)
    // frmData.append('subsubdisposition', this.subsubDisposition)
    // frmData.append('ReplyType', (data.interactionReplyType != 'CaseNote') ? 'Interaction' : '')
    // frmData.append('ReplyID', (data.interactionReplyType != 'CaseNote') ? data.interactionId : '')
    // frmData.append('MailBox', data.selectedFromEmail?.SupportEmail || null)
    // frmData.append('AgentEmailAddress', JSON.parse(oLoggedInUser).EmailID)
    // frmData.append('IntrRequestOrigin', 'API')
    // for (var i = 0; i < this.myFiles.length; i++) { 
    //   frmData.append('attachmentsFiles',this.myFiles[i]);
    // }

    //console.log(interactionRq);
    this.caseService.postData('sendMail', interactionRq).subscribe(data => {
      // this.caseService.createInteraction(interactionRq).subscribe(data => {
      if (data.status) {
        //Refresh the Interaction History...
        this.toastr.success('Mail Sent.');
        this._getCaseInteractionHistory({ "caseid": _caseId });
        this.myFiles = [];
        this.filePatch = [];
      }
      else {
        alert('Interaction Failed...');
      }

    }).add(() => {
      this.isEditorBlur = false;
    });
  })
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
    // "userType": JSON.parse(oLoggedInUser).UserType,
    let rquest = {
      "caseId": [
        caseId
      ],
      "userType": 'agent',
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
      "disposition": "1",
      "subdisposition": "1",
      "subsubdisposition": "1",
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
      "disposition": "1",
      "subdisposition": "1",
      "subsubdisposition": "1",
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

  drowpdownSelectedData() {

    this.subscription = this.caseService.observeDrpData().subscribe(data => {
console.log('--------------------^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6',data);

      this.disposition = data.selectedDisposition;
      this.subDisposition = data.selectedSubdisposition;
      this.subsubDisposition = data.selectedsubsubdisposition;
    });

  }



  //Role based access permission 

  roleBasedAccessModule: any = [];
  spamCasesRole: any;
  blockCasesRole: any;
  closeOwnCasesRole: any;
  pickupOwnCasesRole: any;
  routeOwnCasesRole: any;
  caseReplayAllAccessRole: any;
  caseAddNoteAccessRole: any;
  addCCInteractionCasesRole: any;
  uploadAttachmentsInteractionRole: any;
  subscriptionRoleModule: Subscription | undefined;
  roleBasedAccess() {
    this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
      // console.log('captrue Role base assess ==abhi== >', result)

      this.roleBasedAccessModule = result;


      [...this.roleBasedAccessModule].map(item => {
        if (item.FeatureName === 'CASE_SpamCases') {
          this.spamCasesRole = item.FeatureStatus;
        }
        else if (item.FeatureName === 'CASE_BlockCases') {
          this.blockCasesRole = item.FeatureStatus;
        }
        else if (item.FeatureName === 'CASE_CloseOwnCases') {
          this.closeOwnCasesRole = item.FeatureStatus;
        }
        else if (item.FeatureName === 'CASE_PickupOwnCase') {
          this.pickupOwnCasesRole = item.FeatureStatus;
        }
        else if (item.FeatureName === 'CASE_AssignOwnCases') {
          this.routeOwnCasesRole = item.FeatureStatus;
        }

        else if (item.FeatureName === 'CASE_Reply_All') {
          this.caseReplayAllAccessRole = item.FeatureStatus;
        }
        else if (item.FeatureName === 'CASE_Add_Note') {
          this.caseAddNoteAccessRole = item.FeatureStatus;
        }
        else if (item.FeatureName === 'CASE_AddCC') {
          this.addCCInteractionCasesRole = item.FeatureStatus;
        }
        else if (item.FeatureName === 'CASE_UploadInteractionAttachments') { this.uploadAttachmentsInteractionRole = item.FeatureStatus; }
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

  //File Attachment dowanload

  fileAttachmentUrl: any;
  dowanloadCaseID: any;
  masterSelected: boolean = false;
  checklist: any;
  checkedList: any = [];
  attachmentFilePathModal(attachmentFilePathList: any, caseId: any) {
    this.dowanloadCaseID = caseId
    let attachmentCaseID =
    {
      "Flag": "Case",
      "CaseId": caseId
    }
    this.ReportService.postData('caseAttachment', attachmentCaseID)
      .subscribe((res) => {
        if (res.data != null) {
          this.fileAttachmentUrl = res.data;
          this.CloseRemark = "";
          this.modalService.open(attachmentFilePathList, { scrollable: true, centered: true, size: 'md' });
        } else {
          this.toastr.error('Empty Files.');
        }
      });
  }



  //Dowanload the Zip File
  compressed_img(fileurl: any, caseID: any) {
    var count = 0;
    var zip = new JSZip();
    zip.file(fileurl);
    fileurl.forEach((url) => {
      const filename = url.split('/')[url.split('/').length - 1];
      JSZipUtils.getBinaryContent(url, (err, data) => {
        if (err) {
          throw err;
        }
        zip.file(filename, data, { binary: true });
        count++;
        if (count === fileurl.length) {
          zip.generateAsync({ type: 'blob' }).then((content) => {
            const objectUrl: string = URL.createObjectURL(content);
            const link: any = document.createElement('a');
            link.download = 'caseFile' + caseID;
            link.href = objectUrl;
            link.click();
            this.closeModalFiledowanloadClear()
          });
        }
      });
    });

  }

  //Select All Checkbox
  checkUncheckAll() {
    for (var i = 0; i < this.fileAttachmentUrl.length; i++) {
      this.fileAttachmentUrl[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }

  // Check All Checkbox Checked
  isAllSelected() {
    this.masterSelected = this.fileAttachmentUrl.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  // Get List of Checked Items
  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.fileAttachmentUrl.length; i++) {
      if (this.fileAttachmentUrl[i].isSelected)
        this.checkedList.push(this.fileAttachmentUrl[i]);
    }
    this.checkedList = this.checkedList;
  }

  downloadFile() {
    console.log(this.checkedList);
    let fileurl = this.checkedList.map(items => {

      return items.AttachmentFilePath;
    })
    this.compressed_img(fileurl, this.dowanloadCaseID);

  }
  closeModalFiledowanloadClear() {
    this.masterSelected = false;
    this.checklist = [];
    this.checkedList = [];
  }





  //////////////////////////////////////////File Attachment ///////////////////////////////
  myFiles: any = [];
  sMsg: any = '';
  display: any;
  fileAttachment: any;
  fileModalPopup() {
    $('#attachmentModal').modal('show');
  }

  getFileDetails(e: any) {
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {
    $('#attachmentModal').modal('hide');
  }
  closeModalFile() {
    this.myFiles = [];
    this.filePatch = [];
    $('#attachmentModal').modal('hide');

  }



////////////////////////// Custom Field Edit /////////////////////////
  ///
  caseID : any;
  optionVal: any = [];
otherFieldPopupEdit(otherField,caseId) {
  this.caseID = caseId
  this.forms = [];
  this.formJsonOne = [];
  this.Editcustomfileds = [];
  this.createForm()
  this.modalService.open(otherField, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}





// formJsonOne : any= [{AttributeDataType: "text",
// AttributeListID: "",
// AttributeName: "InteractionID",
// BusinessAttributeID: 37,
// DisplayName: "InteractionID",
// ListValue: "",
// cname : 'two'},
// {AttributeDataType: "text",
// AttributeListID: "",
// AttributeName: "demo",
// BusinessAttributeID: 40,
// DisplayName: "demo",
// ListValue: "",
// cname : 'one'
// },
// {
// AttributeDataType: "list",
// AttributeListID: "--Select--",
// AttributeName: "",
// BusinessAttributeID: 39,
// DisplayName: "DBID",
// ListValue: "--Select--",
// cname : 'ss'
// }
// ]




formJsonOne : any = [];
createForm() {
let req= {
  "objname" : this.caseID,
  "flag" :"GetCaseAttributeValue"
}

this.caseService.postData('Getbuisnessobject',req).subscribe(result =>{
let arr2 = result.data;
if(arr2 != null)
{
  const results = this.buisnessobjectList.filter(({ BusinessAttributeID: id1 }) => !arr2.some(({ BusinessAttributeID: id2 }) => id2 === id1));
  results.map(e => {
    this.formJsonOne.push({
    AttributeDataType: e.AttributeDataType,
    AttributeListID:"",
    AttributeName: e.AttributeName,
    BusinessAttributeID:  e.BusinessAttributeID,
    DisplayName:  e.DisplayName,
    ListValue:"",
    cname : "",
    option :   e.option
    }) 
  })
  
for( let  i=0;i<this.buisnessobjectList.length;i++){
for(let j=0;j<arr2.length;j++){
if(this.buisnessobjectList[i].BusinessAttributeID === arr2[j].BusinessAttributeID){
  console.log('-------------=====>',arr2[j].BusinessAttributeValue)
this.formJsonOne.push({
AttributeDataType: this.buisnessobjectList[i].AttributeDataType,
AttributeListID:"",
AttributeName: this.buisnessobjectList[i].AttributeName,
BusinessAttributeID:  this.buisnessobjectList[i].BusinessAttributeID,
DisplayName:  this.buisnessobjectList[i].DisplayName,
ListValue:"",
cname :  arr2[j].BusinessAttributeValue,
option :   this.buisnessobjectList[i].option
}) 
}
}

}

}else{

  this.buisnessobjectList.map(e => {
    this.formJsonOne.push({
    AttributeDataType: e.AttributeDataType,
    AttributeListID:"",
    AttributeName: e.AttributeName,
    BusinessAttributeID:  e.BusinessAttributeID,
    DisplayName:  e.DisplayName,
    ListValue:"",
    cname : "",
    option :   e.option
    }) 
  
  })


}
//patch the values in form data inside
  if (this.formJsonOne == null) return;
  let dataObject = this.formJsonOne;
  let objectProps = Object.keys(dataObject).map((prop) => {
    // console.log(prop);
    
    return Object.assign({}, { key: prop}, dataObject[prop]);
      // return Object.assign({}, { key: prop}, dataObject[prop]);
  });


  // console.log('sa',objectProps);
  
  const formGroup = {};
  for (let prop of Object.keys(dataObject)) {
    console.log(dataObject[prop].cname);
    formGroup[prop] = new FormControl(
      dataObject[prop].cname || null,
    );
  }

  this.fg = new FormGroup(formGroup);
  const form: form = {
    formGroup: this.fg,
    metaData: objectProps,
  };
  this.fg.valueChanges.subscribe((values) => {
    this.output.emit(this.fg);
  });
  this.forms.push(form);
  return form;
})
}

Editcustomfileds:any = [];
oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
getMyValue(val,data){
  let custname = val.target.value;
  console.log(data);
  
  if (data.AttributeDataType === 'text') {
  // let temp = {
  //   BusinessAttributeID : data.BusinessAttributeID,
  //   BusinessAttributeValue : custname,
  //   CreatedBy : JSON.parse(this.oLoggedInUser).UserID,
  //   DisplayName : data.DisplayName,
  //   UserType :  JSON.parse(this.oLoggedInUser).UserType,
  // }
  let temp = {
        caseId : this.caseID,
        UserType :  JSON.parse(this.oLoggedInUser).UserType,
        userID : JSON.parse(this.oLoggedInUser).UserID,
        BusinessAttributeID : data.BusinessAttributeID,
        NewValue : custname,
        Field : data.DisplayName
      }
  
      if(this.Editcustomfileds.length != 0){
  //Find index of specific object using findIndex method.    
  let objIndex = this.Editcustomfileds.findIndex((obj => obj.BusinessAttributeID == data.BusinessAttributeID));
  if(objIndex != -1){
  //Log object to Console.
  //Update object's name property.
  this.Editcustomfileds[objIndex].NewValue = custname
  //Log object to console again.
  console.log("After update: ", this.Editcustomfileds[objIndex])
  }
  else
  {
    this.Editcustomfileds.push(temp);
  }
  }else{
    this.Editcustomfileds.push(temp);
  }
  }
  console.log(this.Editcustomfileds);
  
    }


    selectDropDown(valuess,data){

// console.log(this.fg);
console.log(data);
console.log(valuess);
    //fetch drop down value custom fields
    // let req= {
    //   "UserType" :"",
    // "BusinessAttributeID" :val
    // }
    // this.caseService.postData('getAttributeDrp',req).subscribe(result =>{
    //   console.log('result ======hhhhhhhhhhhhhhhhhhhh=>',result.data)
    //   let dropdownVal = result.data;
    // this.optionVal = dropdownVal.map(item => {
    //   if(item.BusinessAttributeID === val){
    //  return   item.ListValue
    //   }
    //  })
    // })
      let custname = valuess;
      console.log(custname);
      
      let abc = {
        caseId : this.caseID,
        UserType :  JSON.parse(this.oLoggedInUser).UserType,
        userID : JSON.parse(this.oLoggedInUser).UserID,
        BusinessAttributeID : data.BusinessAttributeID,
        NewValue : custname,
        Field : data.DisplayName,
      }
      
      



      
      if(this.Editcustomfileds.length != 0){
        //Find index of specific object using findIndex method.    
        let objIndex = this.Editcustomfileds.findIndex((obj => obj.BusinessAttributeID == data.BusinessAttributeID));
        if(objIndex != -1){
        //Log object to Console.
        console.log("Before update: ", this.Editcustomfileds[objIndex])
        
        //Update object's name property.
        this.Editcustomfileds[objIndex].NewValue = custname
        
        //Log object to console again.
        console.log("After update: ", this.Editcustomfileds[objIndex])
        
        }else{
          this.Editcustomfileds.push(abc);
        }
        }else{
        
          this.Editcustomfileds.push(abc);
        
        }
        
      
      
      
      
      console.log(this.Editcustomfileds)
      
      
      
      
  
          }



////////////////////////////////////////////////////////////////////////////




buisnessobjectList : any = [];
  getObjectManager(){
    let req= {
      "UserType" :"agent",
    "BusinessAttributeID" :""
    }
    this.caseService.postData('getAttributeDrp',req).subscribe(result =>{
      this.buisnessobjectList = result.data;
console.log('step 1',this.buisnessobjectList)

      this.caseService.postData('businessobjectList',req).subscribe(result =>{
        let buisnessobjectListTwo = result.data;
let data = this.buisnessobjectList.map(e=>{
  let id= e.BusinessAttributeID;
  buisnessobjectListTwo.forEach(i => {
  if(i.BusinessAttributeID == id){
  let option = e['option'] || [];
  option.push(i.ListValue);
  e['option'] = option;
  }
  })
  return e;
  })




      })
      
    })

    }


    updateForm(){

      console.log("val",this.Editcustomfileds)
    
this.caseService.postData('updateCaseAttribute',this.Editcustomfileds).subscribe((res) => {
  console.log(res.data);

  if (res.data) {
    this.toastr.success(res.data);
    this.clearData();
  }
  else {
    alert('Update Interaction Field  Failed...');
    this.clearData();
  }



});

      }
      



    clearData(){
      this.formJsonOne = [];
      this.forms = [];
      this.Editcustomfileds = [];
    }

}


