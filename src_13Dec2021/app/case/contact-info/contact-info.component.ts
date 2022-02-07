import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { ExcelService } from 'src/app/service/excel.service';


@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {
  show = false;
  showEditIconCaseInfo = false;
  buttonName = 'Show';
  hide: any;
  @Input() selectedCaseId: string = "";
  contactInfo: any = [];
  closeResult: string = '';
  caseInfo: any = {};
  subscription: Subscription | undefined;

  pastCases: Array<any>;
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 5;
  absoluteIndex: number = 0;
  caseID: any;

  editIconCaseInfotoggle() {
    this.showEditIconCaseInfo = !this.showEditIconCaseInfo;
    //IF conditional (ternary) operator 
    this.showEditIconCaseInfo ? this.buttonName = 'Hide' : this.buttonName = 'Show'
  }

  getpriority: any = [];
  getstatus: any = [];
  constructor(private caseService: CaseService,
    private modalService: NgbModal, private formBuilder: FormBuilder,
    private toastr: ToastrService, private router: Router
    , private excelservice: ExcelService) {
    this.pastCases = new Array<any>();
  }
  //Case Info form
  contactInfoEditForm = this.formBuilder.group({
    status: [''],
    priority: [''],
    caseid: [''],
    userid: ['']
  });

  //contact info form
  contactEditForm = this.formBuilder.group({
    phone: [''],
    email: [''],
    facebook: [''],
    twitter: [''],
    instagram: [''],
    whatsup: ['']
  });

  ngOnInit(): void {
    this.getcaseInfoDetails();
    this.getCaseStatus();
    this.getcasepriority();
    // this.getPastcases();
 
    //Role base Access
    this.roleBasedAccess();

  }




  toggle() {
    this.show = !this.show;
    //IF conditional (ternary) operator 
    this.show ? this.buttonName = 'Hide' : this.buttonName = 'Show'
    this.contactEditForm.setValue({
      phone: this.contactInfo.PrimaryPhone,
      email: this.contactInfo.PrimaryEmail,
      facebook: this.contactInfo.Facebook,
      twitter: this.contactInfo.Twitter,
      instagram: this.contactInfo.Instagram,
      whatsup: this.contactInfo.Whatsup,

    });
  }



  //this function is get Status dropdown
  getCaseStatus() {
    let statusRequest: any = {
      "flag": "status"
    }
    this.caseService.postData('getStatus', statusRequest).subscribe(result => {
      console.log('getCaseStatus', result.data)
      this.getstatus = result.data;
    })
  }

  //this function is get priority dropdown
  getcasepriority() {
    let priorityRequest: any = {
      "flag": "priority"
    }
    this.caseService.postData('getPriority', priorityRequest).subscribe(result => {
      console.log(result.data)
      this.getpriority = result.data;
    })
  }


  getcaseInfoDetails() {
    this.subscription = this.caseService.observeCaseData().subscribe(message => {
      this.caseID = message.caseid;
      
if(message.caseid != undefined){
      let caseInfoRq: any = {
        "caseId": message.caseid
      }
      let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
      this.caseService.postData('caseinfoApi', caseInfoRq).subscribe(data => {
        if (data.status) {
          this.caseInfo = data.data[0];
          this.selectedCaseId = message.caseid;
          this.contactInfoEditForm.setValue({
            priority: this.caseInfo.Priority,
            status: this.caseInfo.Status,
            caseid: this.caseInfo.CaseID,
            userid: JSON.parse(oLoggedInUser).UserID,
          });
        }
      })
    }else{
      this.caseInfo =[];
      this.contactInfoEditForm.reset();
    }
    })

  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('step contact info');
    
    // console.log(changes.selectedCaseId.currentValue);
    if (changes.selectedCaseId.currentValue) {
      let contactInfoRq: any = {
        "caseId": changes.selectedCaseId.currentValue
      }
      this.caseService.postData('contactinfoApi', contactInfoRq).subscribe(data => {
        // this.caseService.getContactInfo(contactInfoRq).subscribe(data => {
      console.log('kokokokokokokok==============158 co',data);
      if(data.data != null){
        if (data.status) {
          this.contactInfo = data.data[0];
        }
      }else{
        this.contactInfo = [];
      }
        //console.log('getContactInfo', this.contactInfoIP);
      })
    }

  }
  status(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  closeCaseinfoEdit() {
    this.showEditIconCaseInfo = false;
    // this.show = false;
  }

  closeEditContact() {
    this.show = false;

  }

  updateCaseInfo() {
    this.caseService.postData('UpdateStatusPriortiy', this.contactInfoEditForm.value).subscribe(result => {
      if (result.data[0]['Result'] == 'Record Updated') {
        this.toastr.success('Case Info Updated.')
        this.redirectCase()
        this.closeCaseinfoEdit()
      }
    })
  }

  updateContactInfos() {
    console.log('contactInfo Object', this.contactInfo);
    let contactType = this.contactInfo.ContactType || '';
    let contactTypeId = (contactType.toUpperCase() == 'REQUESTER') ? this.contactInfo.RequesterId : this.contactInfo.ContactID;
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let contactEditRequest = {
      Id: contactTypeId,
      userType: (contactType.toUpperCase() == 'REQUESTER') ? 'requester' : 'contact',
      name: this.contactInfo.FullName,
      email: this.contactEditForm.value.email,
      phone: this.contactEditForm.value.phone,
      facebook: this.contactEditForm.value.facebook,
      twitter: this.contactEditForm.value.twitter,
      instagram: this.contactEditForm.value.instagram,
      whatsapp: this.contactEditForm.value.whatsup,
      caseId: this.caseInfo.CaseID,
      UserID: JSON.parse(oLoggedInUser).UserID,
    }

    console.log('contactEditRQ', contactEditRequest)
    this.caseService.postData('UpdateContactInfo', contactEditRequest).subscribe(result => {
      console.log(result.message)
      if (result.message == 'Success') {
        this.contactInfo = {
          AdditionalInfo: null,
          BlockedSender: false,
          ContactExistStatus: 1,
          ContactID: this.contactInfo.ContactID,
          ContactType: "contact",
          Facebook: this.contactEditForm.value.facebook,
          FullName: this.contactInfo.FullName,
          Instagram: this.contactEditForm.value.instagram,
          PrimaryEmail: this.contactEditForm.value.email,
          PrimaryPhone: this.contactEditForm.value.phone,
          Twitter: this.contactEditForm.value.twitter,
          Whatsup: this.contactEditForm.value.whatsup,
        }
        this.toastr.success('contact  Updated.')
        this.redirectCase()
        this.closeEditContact()
        this.contactEditForm.reset()
      } else {
        console.log('Failure')
      }
    })

  }

  redirectCase() {
    this.router.navigateByUrl('/case');
    this.caseService.caselistReload();
  }
  active : boolean = false;
  //Tab Active List 
  pastcaseTabActive() {
    //pass the case id to past case component 
    this.caseService.emitCaseId(this.caseID);
    this.active = true;

  }


  //Role base access permission Module
  roleBasedAccessModule : any = [];
  subscriptionRoleModule: Subscription | undefined;
  editContactCasesRole : any;
  caseinfoAccessModule : any;
  paseCaseAccessModule : any;
  sideconversationAccessModule : any;
  customerAppAccessModule : any;
  calLogsAccessModule : any;
  // callLogSmsAccessModule : any;
  // callLogWhatsAppAccessModule : any;
  // callLogsCallsAccessModule : any;
  roleBasedAccess(){
    // this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo
    // .subscribe(result => {

  this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
this.roleBasedAccessModule = result;
console.log('conact info   =====> 293',result);

 [...this.roleBasedAccessModule].map(item => { 
  if(item.FeatureName === 'CASE_EditContactInfo'){this.editContactCasesRole = item.FeatureStatus;}
  else if(item.FeatureName === 'CASE_Info'){this.caseinfoAccessModule = item.FeatureStatus;}
  else if(item.FeatureName === 'CASE_PastCases'){this.paseCaseAccessModule = item.FeatureStatus;}
  else if(item.FeatureName === 'CASE_SideConversation'){this.sideconversationAccessModule = item.FeatureStatus;}
  else if(item.FeatureName === 'CASE_CustomerAppointment'){this.customerAppAccessModule = item.FeatureStatus;}
  else if(item.FeatureName === 'CASE_CalLogs'){this.calLogsAccessModule = item.FeatureStatus;}
  // else if(item.FeatureName === 'CASE_CallLogsSms'){this.callLogSmsAccessModule = item.FeatureStatus;}
  // else if(item.FeatureName === 'CASE_CallLogsWhatsapp'){this.callLogWhatsAppAccessModule = item.FeatureStatus;}
  // else if(item.FeatureName === 'CASE_CallLogsCall'){this.callLogsCallsAccessModule = item.FeatureStatus;}
});
  })
}
//End Access permission 



  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
    this.subscriptionRoleModule?.unsubscribe();
  }

}
