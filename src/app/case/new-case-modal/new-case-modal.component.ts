import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { ReportService } from 'src/app/service/report.service';
declare const $: any;
@Component({
  selector: 'app-new-case-modal',
  templateUrl: './new-case-modal.component.html',
  styleUrls: ['./new-case-modal.component.scss']
})

export class NewCaseModalComponent implements OnInit {
  constructor(private ReportService: ReportService, private caseService: CaseService,
    private formBuilder: FormBuilder, private toastr: ToastrService, private router: Router) { }
  oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
  newCaseForm: any;
  teamsData: any = [];
  agentsData: any = [];
  sourceEmailData: any = [];
  contactData: any = [];
  accountData: any = [];
  priorityData: any = [];
  statusData: any = [];
  requestTypeData: any = [];
  buisnessHoursData: any = [];
  escalationData: any = [];
  callBackRequestData: any = [];
  sourceChannelData: any = [];
  getComplaintdata: any = [];
  getRequesterdata: any = [];
  selectRadioButton: any = 'ExistingContact';
  subscriptionPopupModal: Subscription | undefined;
  // Newcustomfileds : any = [];
  userTypes = JSON.parse(this.oLoggedInUser).UserType;
  selectedProjects = [];
  Newcustomfileds:any = [];
  customFieldsValue : any = []
  customFieldsValueOne: FormGroup = new FormGroup({
    cname: new FormControl(null, []),
    optionname : new FormControl(null, [])
});
cities = [
  {id: 1, name: 'Vilnius'},
  {id: 2, name: 'Kaunas'},
  {id: 3, name: 'Pavilnys', disabled: true},
  {id: 4, name: 'Pabradė'},
  {id: 5, name: 'Klaipėda'}
];

  projects = [
    {
      id: 'p1',
      title: 'Angent',
      subprojects: [
        { title: 'Subproject 1 of A', id: 's1p1' },
        { title: 'Subproject 2 of A', id: 's2p1' },
      ]
    },
    {
      id: 'p2',
      title: 'demo',
      subprojects: [
        { title: 'Subproject 1 of B', id: 's1p2' },
        { title: 'Subproject 2 of B', id: 's2p2' },
      ]
    }
  ]
  oInxData: any = "";
  config :any= {
    placeholder: 'Type...',
    tabsize: 2,
    height: '120px',
    uploadImagePath: '/api/upload',
    toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['table']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
  @Input() set setProp(value: any) 
  {
    this.oInxData = value;
    console.log('=====================================================',this.oInxData.emailSourceAccount);
    

  }

  get getInxData(): any {
   // this.selectSourceEmail(this.oInxData.arrFromEmail)
    return this.oInxData;
  }


  ngOnInit() {
    this.getTeamData();
    this.getSourceEmail();
    this.getContactData();
    this.getAccountData();
    this.getPriorityData();
    this.getStatusData();
    this.getRequestTypeData();
    this.getbusinessHours();
    this.getescalationdata();
    this.getCallBackRequest();
    this.getSourceChannel();
    this.getComplaint();
    this.getRequester();
    this.fetchCaseForm();
    this.myFunctionOne();
    this.roleBasedAccess();
//////////////////////////////////// Customized Field ////////////////////////
this.getObjectManager();
// let y : any= localStorage.getItem("customizedFields");
// let arr = JSON.parse(y);
// this.Newcustomfileds = arr;
// console.log('Newcustomfileds',this.Newcustomfileds);
  }

  fetchCaseForm() {
    this.newCaseForm = this.formBuilder.group({
      caseType: ['ExistingContact', Validators.required],
      cc: [''],
      subject: ['', [Validators.required]],
      description: ['', [Validators.required]],
      teamId: [null],
      agentId: [null],
      sourceEmailId: [null, [Validators.required]],
      senderEmail: [JSON.parse(this.oLoggedInUser).EmailID],
      contactID: [null],
      accountID: [null, [Validators.required]],
      priority: [null],
      caseStatus: [null, [Validators.required]],
      requestType: [null, [Validators.required]],
      escalation: [null, [Validators.required]],
      buisnessHours: [null, [Validators.required]],
      callBackRequest: [null, [Validators.required]],
      caseSourcePriID: ['EMAIL', [Validators.required]],
      dueDate: ['',[Validators.required]],
      followDate: ['',[Validators.required]],
      requesterID: [null],
      complaintCategory: [null, [Validators.required]],
      name: [''],
      emailTo: [''],
      phoneNumber: [''],
      // customFieldsValue:this.formBuilder.group({
      //   cname : []
      // })
    });
  }


  //Get Team Data
  getTeamData() {
    let ReqparameterTeams =
    {
      "TeamId": "",
      "UserId": "",
      "Flag": "Teams"
    }
    this.ReportService.postData('GetTeamsData', ReqparameterTeams)
      .subscribe((res) => {
        this.teamsData = res.data;
        console.log('teamsData======>',this.teamsData);
      });
  }
  //select Agent value
  selectTeamValue(event: any[]) {
    this.teamIdSelect = undefined; 
    let ReqparameterAgents =
    {
      "TeamId": event,
      "UserId": "",
      "Flag": "Agents"
    }
    console.log(ReqparameterAgents)
    this.ReportService.postData('GetAgentsData', ReqparameterAgents)
      .subscribe((res) => {
        this.agentsData = res.data;
        console.log('=============>agent',this.agentsData);
      });

  }


  //get Source Email detailas
  getSourceEmail() {

    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let userId = JSON.parse(oLoggedInUser).UserID;

    let ReqparameterSourceEmail =
    {
      "flag": "SourceEmail",
      "userId": userId,
    }

    this.ReportService.postData('GetCaseBindDrp', ReqparameterSourceEmail)
      .subscribe((res) => {
        console.log(res)
        this.sourceEmailData = res.data;
        // console.log("sourceEmailData================>"+JSON.stringify(this.sourceEmailData));
      });

  }

  //get Contact data
  getContactData() {
    let ReqparameterContact =
    {
      "flag": "Contact",
      "userId": "",
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterContact)
      .subscribe((res) => {
        this.contactData = res.data;
        // console.log("ReqparameterContact"+JSON.stringify(this.contactData));
      });
  }

  //get Account details
  getAccountData() {
    let ReqparameterAccount =
    {
      "flag": "Account",
      "userId": "",
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterAccount)
      .subscribe((res) => {
        this.accountData = res.data;

      });
  }
  //get priority data
  getPriorityData() {
    let priorityRequest: any = {
      "flag": "priority"
    }
    this.caseService.postData('getPriority', priorityRequest).subscribe(result => {
      this.priorityData = result.data;
    })
  }

  //get status data

  getStatusData() {
    let ReqparameterStatus =
    {
      "flag": "CaseStatus",
      "userid": ""
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterStatus)
      .subscribe((res) => {
        this.statusData = res.data;
        //  console.log('statusData',JSON.stringify(this.statusData));
      });
  }


  //get RequestType data

  getRequestTypeData() {
    let ReqparameterRequestType =
    {
      "flag": "RequestType",
      "userId": ""
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterRequestType)
      .subscribe((res) => {
        this.requestTypeData = res.data;
        //  console.log("ReqparameterRequestType"+JSON.stringify(this.requestTypeData));
      });

  }

  //get buisnessHoursData 
  getbusinessHours() {
    let ReqparameterBusinessHours =
    {
      "flag": "BuisnessHours",
      "userId": ""
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterBusinessHours)
      .subscribe((res) => {
        this.buisnessHoursData = res.data;
      });

  }


  //---- Start Bind Escalation dropdown---//
  getescalationdata() {
    let ReqparameterEscalation =
    {
      "flag": "Escalation",
      "userId": "",
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterEscalation)
      .subscribe((res) => {
        this.escalationData = res.data;
      });
  }
  //---end Bind Escalation dropdown---//

  //  //---- Start Bind CallBackRequest dropdown---//
  getCallBackRequest() {

    let ReqparameterCallBackRequest =
    {
      "flag": "CallBackRequest",
      "userId": "",
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterCallBackRequest)
      .subscribe((res) => {
        this.callBackRequestData = res.data;
      });

  }
  //---Start Bind SourceChannel dropdown---//
  getSourceChannel() {
    let ReqparameterSourceChannel =
    {
      "flag": "SourceChannel",
      "userId": "",
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterSourceChannel)
      .subscribe((res) => {
        this.sourceChannelData = res.data;
      });
  }


  // get complaint Data
  getComplaint() {

    let ReqparameterComplaint =
    {
      "flag": "ComplaintCategory",
      "userId": "",
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterComplaint)
      .subscribe((res) => {
        this.getComplaintdata = res.data;
      });

  }

  //get Request Data 
  getRequester() {

    let ReqparameterRequester =
    {
      "flag": "Requester",
      "userId": "",
    }
    this.ReportService.postData('GetCaseBindDrp', ReqparameterRequester)
      .subscribe((res) => {
        this.getRequesterdata = res.data;
      });

  }
  senderEmailReadonly: boolean = false;
  selctRadioButton(evant: any[]) {
    this.contactError = false;
    this.requesterError = false;
    this.emailTo = false;
    this.name = false;
    this.selectRadioButton = this.newCaseForm.value.caseType
    if (this.selectRadioButton === 'NewRequestor') {
      this.senderEmailReadonly = true;
      this.newCaseForm.patchValue({ senderEmail: JSON.parse(this.oLoggedInUser).EmailID, 
        requesterID: '',
       contactID: '', })
       this.senderEmailReadonly = false;

    } else if (this.selectRadioButton === 'ExistingContact') {
      this.newCaseForm.patchValue(
        {
          senderEmail: JSON.parse(this.oLoggedInUser).EmailID,
          requesterID: '',
          name: '',
          emailTo: '',
          phoneNumber: '',

        })
      this.senderEmailReadonly = false;
    }
    else if (this.selectRadioButton === 'ExistingRequestor') {
      this.newCaseForm.patchValue({
        senderEmail: JSON.parse(this.oLoggedInUser).EmailID,
        contactID: '',
        name: '',
        emailTo: '',
        phoneNumber: ''
      })
      this.senderEmailReadonly = false;
    }

  }
  ccItems: any = [];
  // passSourceEmail(event: any[]) {
  //   console.log(event)
  //   let dropDownVal = { "dropDowns": "agents,contact,requesters" }
  //   this.ReportService.postData('BindCCMailId', dropDownVal)
  //     .subscribe((res) => {
  //       let agentItem = [...res.data.data.Agents]
  //       let arrayObj1 = agentItem.map(item => {
  //         return {
  //           title: item.AgentName,
  //           uniqueId: item.AgentId,
  //           status: "Agents"
  //         };
  //       });
  //       let contactDetailsItem = [...res.data.data.ContactDetails]
  //       let arrayObj2 = contactDetailsItem.map(item => {
  //         return {
  //           title: item.FullName,
  //           uniqueId: item.ContactID,
  //           status: "ContactDetails"
  //         };
  //       });

  //       let requestersItems = [...res.data.data.Requesters]
  //       let arrayObj3 = requestersItems.map(item => {
  //         return {
  //           title: item.RequesterName,
  //           uniqueId: item.RequesterID,
  //           status: "Requesters"
  //         };
  //       });
  //       this.ccItems = [{
  //         id: 'p1',
  //         title: 'Agents',
  //         subprojects: arrayObj1
  //       }, {
  //         id: 'p2',
  //         title: 'Contacts',
  //         subprojects: arrayObj2
  //       }, {
  //         id: 'p3',
  //         title: 'Requester',
  //         subprojects: arrayObj3
  //       },]


  //     })
  // }
  submitted = false;
  error = '';
  ccType: any = [];
  selectedCC: any;
  get f() { return this.newCaseForm.controls; }
  contactError = false;
  requesterError = false;
  emailTo = false;
  name = false;
  SubmitNewCaseVal() {
    if (this.newCaseForm.value.caseType === 'ExistingContact') {
      console.log('ExistingContact', this.newCaseForm.value.contactID);
      if (!this.newCaseForm.value.contactID) {
        this.contactError = true;
      } else {
        this.contactError = false;
      }

    } else if (this.newCaseForm.value.caseType === 'ExistingRequestor') {
      console.log('ExistingRequestor', this.newCaseForm.value)

      if (!this.newCaseForm.value.requesterID) {
        this.requesterError = true;
      } else {
        this.requesterError = false;
      }

    } else if (this.newCaseForm.value.caseType === 'NewRequestor') {
      console.log('NewRequestor')

      if (!this.newCaseForm.value.name && !this.newCaseForm.value.emailTo) {
        this.name = true;
        this.emailTo = true;
      } else if (!this.newCaseForm.value.name) {
        this.name = true;
        this.emailTo = false;
      }
      else if (!this.newCaseForm.value.emailTo) {
        this.emailTo = true;
        this.name = false;
      } else {
        this.name = false;
        this.emailTo = false;
      }
    }

    this.submitted = true;
    if (this.newCaseForm.invalid) {
      return;
    }
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let EmailID = JSON.parse(oLoggedInUser).EmailID;
    let UserType = JSON.parse(oLoggedInUser).UserType;
let interactionUserType : any;
if(UserType === 'admin'){
  interactionUserType = 'agent'
}else{
  interactionUserType = UserType
}


console.log('==================UserType============================',UserType)


    let userId = JSON.parse(oLoggedInUser).UserID;


    let fetchEmail = [...this.newCaseForm.value.cc].map(({ ccEmail }) => ccEmail)
    let getAllEmailCC = [...fetchEmail, ...this.ccType]
    let getEmail  = getAllEmailCC.filter(item => item !== undefined)
    console.log('this.newCaseForm.value.dueDate===============>482',this.newCaseForm.value)
    let frmData = new FormData();
//    let saveEx = {
//       UserID: userId,
//       EmailCC: getEmail,
//       EmailSourceAccount: this.newCaseForm.value.sourceEmailId || "",
//       AccountID: this.newCaseForm.value.accountID,
//       ReplyEmailTo: EmailID, //sessionStorage
//       Description: this.newCaseForm.value.description,
//       Subject: this.newCaseForm.value.subject,
//       Priority: this.newCaseForm.value.priority,
//       Status: this.newCaseForm.value.caseStatus,
//       RequestType: this.newCaseForm.value.requestType,
//       ContactID: this.newCaseForm.value.contactID,
//       SourceChannel: this.newCaseForm.value.caseSourcePriID,
//       Product: "",
//       // FollowupDate: this.newCaseForm.value.followDate,requesterID
//       FollowupDate: this.newCaseForm.value.followDate + ' 00:00',
//       UserType: UserType,//sessionStorage
//       Team: "",
//       DueDate: this.newCaseForm.value.dueDate,
//       Agent: "",
//       REFID: "",
//       InteractionID: "",
//       BusinessHours: this.newCaseForm.value.buisnessHours,
//       RequestedBy: this.newCaseForm.value.requesterID,
//       Source: "DIRECT",
//       SourceID: "MANUAL",
//       Escalation: this.newCaseForm.value.escalation,
//       CallbackReq: this.newCaseForm.value.callBackRequest,
//       FlowID: "",
//       Facebook: "",
//       Twitter: "",
//       UploadFileNames: [],
//       ListAttributes: "",
//       WhatsApp: "",
//       ContactNo: this.newCaseForm.value.phoneNumber,
//       EmailTo: this.newCaseForm.value.emailTo || "", //caseSourcePriID
//       Instagram: "",
//       Name: this.newCaseForm.value.name,
//       AdditionalInfo: {},
//       AgentID: this.newCaseForm.value.agentId,
//       TeamId: this.newCaseForm.value.teamId,
//       saveFrom: "",
//       RequesterID: this.newCaseForm.value.requesterID,
//       ReqSrcChannelId: this.newCaseForm.value.sourceEmailId,
//       ComplaintVal: "Network Issue"
//     }
// console.log('516===========<>',saveEx);

let teamId : any;
if(this.teamIdSelect){
 teamId =  this.teamIdSelect;
}else{
  teamId = this.newCaseForm.value.teamId;
}
    frmData.append('UserID',userId);
    frmData.append('EmailCC',getEmail.join()); 
    frmData.append('EmailSourceAccount',this.newCaseForm.value.sourceEmailId || "");
    frmData.append('AccountID',this.newCaseForm.value.accountID);
    frmData.append('ReplyEmailTo',EmailID);
    frmData.append('Description',this.newCaseForm.value.description);
    frmData.append('Subject', this.newCaseForm.value.subject);
    frmData.append('Priority',this.newCaseForm.value.priority);
    frmData.append('Status',this.newCaseForm.value.caseStatus);
    frmData.append('RequestType',this.newCaseForm.value.requestType);
    frmData.append('ContactID', this.newCaseForm.value.contactID);
    frmData.append('SourceChannel',this.newCaseForm.value.caseSourcePriID);
    frmData.append('Product',"");
    frmData.append('FollowupDate',this.convert(this.newCaseForm.value.followDate) + ' 00:00');
    // frmData.append('UserType',UserType); convert("Thu Jun 09 2011 00:00:00 GMT+0530 (India Standard Time)")
   frmData.append('UserType',(this.newCaseForm.value.caseType === 'ExistingRequestor' ?  'requester' : UserType));
    // caseType


    frmData.append('Team',"");
    frmData.append('DueDate',this.convert(this.newCaseForm.value.dueDate));
    frmData.append('Agent',"");
    frmData.append('REFID',"");
    frmData.append('InteractionID',"");
    frmData.append('UploadFileNames',"[]");
    frmData.append('AdditionalInfo',"{}");
    frmData.append('BusinessHours',this.newCaseForm.value.buisnessHours);
    frmData.append('RequestedBy',this.newCaseForm.value.requesterID);
    frmData.append('Source',"DIRECT");
    frmData.append('SourceID',"MANUAL");
    frmData.append('Escalation',this.newCaseForm.value.escalation);
    frmData.append('CallbackReq',this.newCaseForm.value.callBackRequest,);
    frmData.append('FlowID',"");
    frmData.append('Facebook',"");
    frmData.append('Twitter',"");
    frmData.append('ListAttributes',"");
    frmData.append('WhatsApp',"");
    frmData.append('ContactNo',this.newCaseForm.value.phoneNumber);
    // frmData.append('EmailTo',this.newCaseForm.value.emailTo || "");
    frmData.append('EmailTo',(this.newCaseForm.value.emailTo === '' ?  this.requisterEmailId : this.newCaseForm.value.emailTo));
    frmData.append('Instagram',"");
    frmData.append('Name',this.newCaseForm.value.name);
    frmData.append('AgentID',this.newCaseForm.value.agentId);
    frmData.append('TeamId',   teamId);
    frmData.append('saveFrom',"");
    frmData.append('RequesterID',this.newCaseForm.value.requesterID);
    frmData.append('ReqSrcChannelId',this.newCaseForm.value.sourceEmailId);
    frmData.append('ComplaintVal',"Network Issue")
    console.log('566=======================================================>',frmData);
    
    frmData.append('Newcustomfileds',JSON.stringify(this.Newcustomfileds))

    //Attachment File
    for (var i = 0; i < this.myFiles.length; i++) { 
      frmData.append('attachmentsFiles',this.myFiles[i]);
    }
    //End
    if (!this.contactError && !this.requesterError && !this.name && !this.emailTo) {
      this.caseService.postDataCase('newCaseApi', frmData).subscribe(
        // this.caseService.postData('SaveNewCaseDetails', saveEx).subscribe(
        data => {
          if (data.status) {
            this.toastr.success('Case Created Successfully');
            let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
            let _caseId = data.caseId;
            let interactionRq = {
              "interactionDes":this.newCaseForm.value.description,
              "Subject": this.newCaseForm.value.subject,
              "caseid": data.data,
              "CCMail": getEmail || null,
              "channel": "1",
              "visibility": true,
              "contactId": "",
              // (data.interactionReplyType != 'CaseNote') ? data.selectedToEmail.join() :InteractionDesc
              "EmailContact": this.temp,
              // "ChannelName": this.newCaseForm.value.caseSourcePriID,
              "ChannelName":'Email',
              "userType":interactionUserType,
              "UploadFileNames": [],
              "sessionId": "",
              "saveFrom": interactionUserType,
              "direction": "1",
              "subdisposition": "1",
              "subsubdisposition": "1",
              "ReplyType": "Interaction",
              "ReplyID":  "",
              "MailBox": this.newCaseForm.value.sourceEmailId || null,
              "AgentEmailAddress": JSON.parse(oLoggedInUser).EmailID,
              "IntrRequestOrigin": "API"
            };
            console.log('interactionRq===============>562',interactionRq);
            this.caseService.postData('sendMail', interactionRq).subscribe(data => {
  this.caseService.caseListFilterReload('CaseCreated');
  this.closeModal();
            })
          }
          else {
            this.toastr.error('Case creation failed.');
          }
        },
        error => console.log('markCaseAsSpam', error?.message))
      $('#longContent').modal('hide')
    }

  }

  addEmailCC(ccEmail: any) {
    console.log(ccEmail)
    return { ccEmail: ccEmail, tag: true };
  }
  selectSourceEmail(value: any) {
    let ccFlag = {
      "flag": "CC",
      "userId": value
    }
    this.caseService.postData('GetCaseBindDrp', ccFlag).subscribe(data => {

      var CCids = data.data[0]['CCId'];
      if (CCids !== "" && CCids !== null && CCids !== undefined) {
        var CCidsArr = CCids.split(',');
        this.ccType = CCidsArr;// [data.data[0]['CCId']]

        this.newCaseForm.patchValue({
          cc: this.ccType
        })
      }
      else {
        this.newCaseForm.patchValue({
          cc: ""
        })
      }
    })

  }
  
  //popup modal Open
  myFunctionOne() {
    $('#longContent').modal('show');
    this.subscriptionPopupModal = this.caseService.popupModalActive.subscribe((data) => {
      $('#longContent').modal('show');
    })
  }

  closeModal() {
    this.submitted = false;
    this.selectRadioButton = 'ExistingContact';
    this.fetchCaseForm();
    this.caseService.modalcloseInactive();
    $('#longContent').modal('hide')
    this.myFiles = [];
  }

  selectEmailCC(values: any) {
    let result = [...values].map(item => { return item.ccEmail || item; });
    this.ccType = result;
  }

  temp : any
  ContactInteraction : any;
  RequesterInteraction  :any;
  requisterEmailId : any ;
contactRequestorFields(value: any,val : any){
 if('ContactInteraction' === val){
  let  reqEmail= this.contactData.filter(item => item.ContactID === value)
  this.requisterEmailId =  reqEmail[0].PrimaryEmail
  let objContact = {
    "flag" : "ContactInteraction",
     "userId" : value
   }
     this.caseService.postData('GetCaseBindDrp', objContact).subscribe(data => {
     this.temp = data.data[0].Email;
     console.log('sgss',this.temp);
     
     })
}
else if('RequesterInteraction' === val){

  let  reqEmail= this.getRequesterdata.filter(item => item.RequesterID === value)
  this.requisterEmailId =  reqEmail[0].Email


    let objContact = {
      "flag" : "RequesterInteraction",
       "userId" : value
     }
       this.caseService.postData('GetCaseBindDrp', objContact).subscribe(data => {
       this.temp = data.data[0].RequesterName;
       })
  }

if(value){
      this.contactError = false;
      this.requesterError = false;
}
}
 requestorFields(value: any){
if(value === "name")
{
  console.log('====')
this.name = false;

}else if(value === "emailTo"){
   console.log('==!!==',this.newCaseForm.value.emailTo)
   this.temp = this.newCaseForm.value.emailTo;
this.emailTo = false;
}
}


  //////////////////////////////////////////File Attachment ///////////////////////////////
  myFiles:any = [];
  sMsg:any = '';
  display : any ;
  fileModalPopup() {
    $('#fileModal').modal('show');
    // this.display = 'block'
  }
  getFileDetails (e : any) {
    // debugger;
    

    for (var i = 0; i < e.target.files.length; i++) { 
    console.log("tet======",e.target.files[i].name.substr(0, 10))
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles () {
    // debugger;
    // this.display = 'none'
    $('#fileModal').modal('hide');
  }
  closeModalFile(){
    // this.display = 'none'
    $('#fileModal').modal('hide');
  }



  //Role base access permission Module
  roleBasedAccessModule : any = [];
  subscriptionRoleModule: Subscription | undefined;
  uploadAttachmentsCasesRole:any;
  roleBasedAccess(){
    console.log('hshshsroleBasedAccessroleBasedAccessroleBasedAccessroleBasedAccess')
    this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo
    .subscribe(result => {
     this.roleBasedAccessModule = result;
   [...this.roleBasedAccessModule].map(item => { 
     if(item.FeatureName === 'CASE_UploadCaseAttachments'){
      this.uploadAttachmentsCasesRole = item.FeatureStatus; 
    }
   });
    });
}
//End Access permission 
 
  //Validation for only number
  numericOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43 ||
      charCode === 33 || charCode === 35 || charCode === 47 || charCode === 36 ||
      charCode === 37 || charCode === 38 || charCode === 40 || charCode === 41 || charCode === 42
      || charCode > 47 && (charCode < 48 || charCode > 57)) {
      return false;
    } else if (event.target.value.length >= 20) {
      return false;
    }
    return true;
  }



  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionPopupModal?.unsubscribe();
    
    this.subscriptionRoleModule?.unsubscribe();
  }


  FullName : any;
  UserID  : any;
  teamIdSelect : any;
  assignToMe(){
    this.FullName = JSON.parse(this.oLoggedInUser).FullName;
    this.UserID = JSON.parse(this.oLoggedInUser).UserID;
    console.log('userTypesuserTypesuserTypesuserTypes===>',this.FullName)
    console.log('userTypesuserTypesuserTypesuserTypes===>',this.UserID)
//team
    let objreq = {
      "flag" : "TeamsCaseBind",
       "userId" : this.UserID
      }
       this.caseService.postData('GetCaseBindDrp', objreq).subscribe(data => {
      this.teamsData = data.data;
      console.log('--->',this.teamsData[0].TeamID);
      
      // this.newCaseForm.patchValue({teamId:this.teamsData[0].TeamID})
      // this.teamIdSelect  = this.teamsData[0].TeamID;
      this.newCaseForm.patchValue({teamId:this.teamsData[0].TeamID.toString()})
      this.teamIdSelect  = this.teamsData[0].TeamID;

       })
//agent
console.log('step agewnt 1',this.agentsData )
   this.agentsData = [{UserID: this.UserID, FullName: this.FullName}]
   console.log('step 2',this.agentsData )
   this.newCaseForm.patchValue({ agentId:this.agentsData[0].UserID })
  }


  ///
  optionVal : any = [];
  buisnessobjectList : any = [];
  getObjectManager(){
    // let req= {
    //   "objname":"Case",
    //   "Flag" : "Details"
    // }
    // this.caseService.postData('Getbuisnessobject',req).subscribe(result =>{
    //   console.log('result =======>',result.data)
    //   this.buisnessobjectList = result.data
      
    // })
    let req= {
      "UserType" :"agent",
    "BusinessAttributeID" :""
    }
    this.caseService.postData('getAttributeDrp',req).subscribe(result =>{
      this.buisnessobjectList = result.data;
console.log('step 1',this.buisnessobjectList)

      this.caseService.postData('businessobjectList',req).subscribe(result =>{
        let buisnessobjectListTwo = result.data;


console.log('step 2',buisnessobjectListTwo);


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

  console.log('step oooooooooooooooooooooo2',buisnessobjectListTwo);
      })
      
      

// let abc = [
//   {
//       "DisplayName": "Online",
//       "BusinessAttributeID": 39,
//       "ListValue": "test4",
//       "AttributeListID": 171
//   },
//   {
//       "DisplayName": "Online",
//       "BusinessAttributeID": 39,
//       "ListValue": "test2",
//       "AttributeListID": 1176
//   },
//   {
//       "DisplayName": "Online",
//       "BusinessAttributeID": 39,
//       "ListValue": "test3",
//       "AttributeListID": 1177
//   },
//   {
//       "DisplayName": "Online",
//       "BusinessAttributeID": 39,
//       "ListValue": "test1",
//       "AttributeListID": 1178
//   },
//   {
//       "DisplayName": "Online",
//       "BusinessAttributeID": 39,
//       "ListValue": "test 3",
//       "AttributeListID": 1179
//   }
// ]

// let yy = this.buisnessobjectList.map(item => {
//   console.log(item.BusinessAttributeID)
//   abc.map(items => {
//     if(item.AttributeDataType === 'list'  && item.BusinessAttributeID === items.BusinessAttributeID){
//       console.log(items.ListValue);
//       item = items.ListValue
//     }
//   })
// })

    })




    }



    selectDropDown(val,data){

  console.log(val);
  console.log(data)
// var result = this.Newcustomfileds.reduce((unique, o) => {
//   if(!unique.some(obj => obj.label === o.label && obj.value === o.value)) {
//     unique.push(o);
//   }
//   return unique;
// },[]);
// console.log(result);


let abc = {
  BusinessAttributeID : data.BusinessAttributeID,
  BusinessAttributeValue : this.customFieldsValueOne.value.optionname,
  CreatedBy : JSON.parse(this.oLoggedInUser).UserID
}



if(this.Newcustomfileds.length != 0){
  //Find index of specific object using findIndex method.    
  let objIndex = this.Newcustomfileds.findIndex((obj => obj.BusinessAttributeID == data.BusinessAttributeID));
  if(objIndex != -1){
  //Log object to Console.
  console.log("Before update: ", this.Newcustomfileds[objIndex])
  
  //Update object's name property.
  this.Newcustomfileds[objIndex].BusinessAttributeValue = this.customFieldsValueOne.value.optionname
  
  //Log object to console again.
  console.log("After update: ", this.Newcustomfileds[objIndex])
  
  }else{
    this.Newcustomfileds.push(abc);
  }
  }else{
  
    this.Newcustomfileds.push(abc);
  
  }
  





// for(let i=0;i<this.Newcustomfileds.length;i++){
// console.log(this.Newcustomfileds[i]['BusinessAttributeID'])
//   if(this.Newcustomfileds[i]['BusinessAttributeID'] === data.BusinessAttributeID){

//     this.Newcustomfileds.splice(this.Newcustomfileds.indexOf(data.BusinessAttributeID), 1);

//   }



// }








//fetch drop down value custom fields
let req= {
  "UserType" :"",
"BusinessAttributeID" :val
}
this.caseService.postData('getAttributeDrp',req).subscribe(result =>{
  console.log('result ======hhhhhhhhhhhhhhhhhhhh=>',result.data)
  let dropdownVal = result.data;
this.optionVal = dropdownVal.map(item => {
  if( item.BusinessAttributeID === val){
 return   item.ListValue
  }
 })
})


// let abc =   [
//   {
//       "BusinessAttributeID": 44,
//       "ListValue": "frfrf",
//       "AttributeListID": 1172,
//       "AttributeDataType": "list",
//       "DisplayName": "demo step 1"
//   },
//   {
//       "BusinessAttributeID": 44,
//       "ListValue": "qqqqq",
//       "AttributeListID": 1173,
//       "AttributeDataType": "list",
//       "DisplayName": "demo step 1"
//   },
//   {
//       "BusinessAttributeID": 44,
//       "ListValue": "aaaaa",
//       "AttributeListID": 1174,
//       "AttributeDataType": "list",
//       "DisplayName": "demo step 1"
//   },
//   {
//     "BusinessAttributeID": 39,
//     "ListValue": "test",
//     "AttributeListID": 171,
//     "AttributeDataType": "list",
//     "DisplayName": "Online"
// }
// ]
//  this.sample = abc.filter(item => item.BusinessAttributeID === val   )

// this.optionVal = this.sample.map(item => {
//  if( item.BusinessAttributeID === val){
// return   item.ListValue
//  }

// })
// console.log(this.optionVal );
    }



  //   {
  //     "BusinessAttributeID": "102",
  //     "BusinessAttributeValue": "test",
  //     "CaseID": "211220134601380",
  //     "CreatedBy": "system"
  // }


  getMyValue(val,e,data){
if (data.AttributeDataType === 'text') {
let abc = {
  BusinessAttributeID : data.BusinessAttributeID,
  BusinessAttributeValue : this.customFieldsValueOne.value.cname,
  CreatedBy : JSON.parse(this.oLoggedInUser).UserID

}

    if(this.Newcustomfileds.length != 0){
//Find index of specific object using findIndex method.    
let objIndex = this.Newcustomfileds.findIndex((obj => obj.BusinessAttributeID == data.BusinessAttributeID));
console.log('objIndex',objIndex)


if(objIndex != -1){
//Log object to Console.
console.log("Before update: ", this.Newcustomfileds[objIndex])

//Update object's name property.
this.Newcustomfileds[objIndex].BusinessAttributeValue = this.customFieldsValueOne.value.cname

//Log object to console again.
console.log("After update: ", this.Newcustomfileds[objIndex])
}else{
  this.Newcustomfileds.push(abc);
}

}else{

  this.Newcustomfileds.push(abc);

}




// console.log(this.Newcustomfileds);


  // this.Newcustomfiledsa['BusinessAttributeID'] = data.BusinessAttributeID;
  // this.Newcustomfileds['BusinessAttributeValue'] = data.BusinessAttributeValue;
}


// else if (data.AttributeDataType === 'list') {
//   let abc = {
//     BusinessAttributeID : data.BusinessAttributeID,
//     BusinessAttributeValue : data.BusinessAttributeValue,
//   "type":'list'
//   }
  
//   this.Newcustomfileds.push(abc);
//     // this.Newcustomfiledsa['BusinessAttributeID'] = data.BusinessAttributeID;
//     // this.Newcustomfileds['BusinessAttributeValue'] = data.BusinessAttributeValue;
//   }


// console.log(this.Newcustomfileds)
  }
  // Newcustomfiledsa = []
  // Newcustomfileds = [];
  // StoreCustomfeilds: Array<object> = [];


//Date Convertion
   convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }








}

