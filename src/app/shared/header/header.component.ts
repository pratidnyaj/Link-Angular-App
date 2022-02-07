import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/service/client.service';
import { ToastrService } from 'ngx-toastr';
import { CONTACTRQ } from './headerDataModel';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
//import { NewCaseModalComponent } from 'src/app/case/new-case-modal/new-case-modal.component';
//import { ContactCaseModalComponent } from 'src/app/case/contact-case-modal/contact-case-modal.component';

let ContactCaseModalComponent: any;
let NewCaseModalComponent: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userType!: string;
  sessionRequired!: string;
  contactName!: string;
  primaryEmail!: string;
  accountId!: string;
  language!: string;
  primaryPhone!: string;
  altEmail1!: string;
  altEmail2!: string;
  altEmail3!: string;
  altEmail4!: string;
  altPhone1!: string;
  altPhone3!: string;
  altPhone4!: string;
  altPhone2!: string;
  timeZoneId!: string;
  designation!: string;
  address!: string;
  city!: string;
  status!: boolean;
  Blockedstatus!: boolean;
  notes!: string;
  photo!: string;
  password!: string;
  type!: string;
  reqID!: string;
  facebook!: string;
  Instagram!: string;
  Whatsapp!: string;
  Twitter!: string;
  UserID!: string;
  oContactinRq!: CONTACTRQ;
  profilephotourl : any;
  selectedContact: any = {};
  //captures the currently selected contact from the contacts list which is used to apply the active class.
  currentSelectedContactId: string = "";
  isContactistBlur: boolean = false;

 

  constructor(private ClientService: ClientService, private modalService: NgbModal,
    private toastr: ToastrService, private caseService: CaseService) {
    this.oContactinRq = new CONTACTRQ();

    this.userType = "",
      this.sessionRequired = "",
      this.contactName = "",
      this.primaryEmail = "",
      this.accountId = "",
      this.language = "",
      this.primaryPhone = "",
      this.altEmail1 = "",
      this.altEmail2 = "",
      this.altEmail3 = "",
      this.altEmail4 = "",
      this.altPhone1 = "",
      this.altPhone3 = "",
      this.altPhone4 = "",
      this.altPhone2 = "",
      this.timeZoneId = "85",
      this.designation = "",
      this.address = "",
      this.city = "",
      this.status = true,
      this.Blockedstatus = false,
      this.notes = "",
      this.photo = "",
      this.password = "",
      this.type = "Contact",
      this.reqID = "",
      this.facebook = "",
      this.Instagram = "",
      this.Whatsapp = "",
      this.Twitter = "",
      this.UserID = sessionStorage.getItem("_loggedInUser") || ""
  //   let   oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
  //  this.profilephotourl = JSON.parse(oLoggedInUser).profilephotourl;
  // this.oContactinRq.UserID = JSON.parse(oLoggedInUser).UserID;

  }
  closeResult: string = '';

  //This Subscription will trigger changes to dependent components.
  //Mimics clicking of case from contact list.
  _syncContactId: string = "";
  syncSubscription: Subscription | undefined;
  ngOnInit() {
    this.popupModalClose();
    this.roleBasedAccess();
    this.blinkTimer();
  }

  // to open side toggle
  webEngageState: boolean = false;
  dashboardState: boolean = false;
  knowledgeManagerState: boolean = false;
  clockState: boolean = false;
  blockState: boolean = false;
  notifyState: boolean = false;

  // to open web engagement and close the othe side toggle
  openWebEngage() {
    this.webEngageState = !this.webEngageState;
    this.dashboardState = false;
    this.knowledgeManagerState = false;
    this.clockState = false;
    this.blockState = false;
    this.notifyState = false;

  }
  closeWebEngage(data: any) {
    this.webEngageState = data;
  }
  openDashboard() {
    this.webEngageState = false;
    this.dashboardState = !this.dashboardState;
    this.knowledgeManagerState = false;
    this.clockState = false;
    this.blockState = false;
    this.notifyState = false;

  }
  closeDashboard(data: any) {
    this.dashboardState = data;
  }
  openKnowledgeManager() {
    this.webEngageState = false;
    this.dashboardState = false;
    this.knowledgeManagerState = !this.knowledgeManagerState;
    this.clockState = false;
    this.blockState = false;
    this.notifyState = false;

  }

  closeKnowledgeManager(data: any) {
    this.knowledgeManagerState = data;
  }
  openClock() {
    this.webEngageState = false;
    this.dashboardState = false;
    this.knowledgeManagerState = false;
    this.clockState = !this.clockState;
    this.blockState = false;
    this.notifyState = false;

  }
  closeClock(data: any) {
    this.clockState = data;
  }
  openBlockCase() {
    this.webEngageState = false;
    this.dashboardState = false;
    this.knowledgeManagerState = false;
    this.clockState = false;
    this.blockState = !this.blockState;
    this.notifyState = false;

  }
  closeBlock(data: any) {
    this.blockState = data;
  }
  openNotifylist() {
    this.webEngageState = false;
    this.dashboardState = false;
    this.knowledgeManagerState = false;
    this.clockState = false;
    this.blockState = false;
    this.notifyState = !this.notifyState;
  }
  closeNotification(data: any) {
    this.notifyState = data;
  }

  // side toggle for all elements close here

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  createContact() {

    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const phoneFilter = /^((\\+91-?)|0)?[0-9]{10}$/;
    if (this.contactName == "") {
      this.toastr.warning("Please Enter Contact Name");
    }
    else if (this.facebook == "") {
      this.toastr.warning("Please Enter FacebookId");
    }
    else if (this.language == "") {
      this.toastr.warning("Select Language");
    }
    else if (this.primaryEmail == "") {
      this.toastr.warning("Please Enter EmailId");
    }
    else if (regularExpression.test(String(this.primaryEmail).toLowerCase()) == false) {
      this.toastr.warning("Please Enter Valid EmailId");
    }
    else if (this.altEmail1 != "") {
      if (regularExpression.test(String(this.altEmail1).toLowerCase()) == false) {
        this.toastr.warning("Please Enter Valid EmailId2");
      }
    }
    else if (this.primaryPhone == "") {
      this.toastr.warning("Please Enter Phone No");
    }
    else if (!phoneFilter.test(this.primaryPhone)) {
      this.toastr.warning("Please Enter Valid Phone No");
    }
    else if (this.altEmail1 != "") {
      if (!phoneFilter.test(this.altPhone1)) {
        this.toastr.warning("Please Enter Valid Phone No2");
      }
    }
    else if (this.city == "") {
      this.toastr.warning("Please Select City");
    }
    else if (this.timeZoneId == "") {
      this.toastr.warning("Please Select TimeZone");
    }
    else if (this.address == "") {
      this.toastr.warning("Please Enter Address");
    }
    else {
      console.log("call");
      let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";

      this.oContactinRq.userType = "agent"//this.userType;
      this.oContactinRq.sessionRequired = this.sessionRequired;
      this.oContactinRq.contactName = this.contactName;
      this.oContactinRq.primaryEmail = this.primaryEmail;
      this.oContactinRq.accountId = this.accountId;
      this.oContactinRq.language = this.language;
      this.oContactinRq.primaryPhone = this.primaryPhone;
      this.oContactinRq.altEmail1 = this.altEmail1;
      this.oContactinRq.altEmail2 = this.altEmail2;
      this.oContactinRq.altEmail3 = this.altEmail3;
      this.oContactinRq.altEmail4 = this.altEmail4;
      this.oContactinRq.altPhone1 = this.altPhone1;
      this.oContactinRq.altPhone2 = this.altPhone2;
      this.oContactinRq.altPhone3 = this.altPhone3;
      this.oContactinRq.altPhone4 = this.altPhone4;
      this.oContactinRq.timeZoneId = "85";
      this.oContactinRq.designation = this.designation;
      this.oContactinRq.address = this.address;
      this.oContactinRq.city = this.address;
      this.oContactinRq.status = true;
      this.oContactinRq.Blockedstatus = false;
      this.oContactinRq.notes = this.notes;
      this.oContactinRq.photo = this.photo;
      this.oContactinRq.password = this.password;
      this.oContactinRq.type = "Contact";
      this.oContactinRq.reqID = this.reqID;
      this.oContactinRq.facebook = this.facebook;
      this.oContactinRq.Instagram = this.Instagram;
      this.oContactinRq.Whatsapp = this.Whatsapp;
      this.oContactinRq.Twitter = this.Twitter;
      this.oContactinRq.UserID = JSON.parse(oLoggedInUser).UserID;
      this.ClientService.postData('SaveNewContact', this.oContactinRq).subscribe(data => {
        // this.ClientService.CreateContact(this.oContactinRq).subscribe(data => {
        console.log('contact-info', data);
        if (data.status) {
          this.toastr.success("Contact Added Successfully");
          this.closeResult = `Dismissed ${this.getDismissReason("Cross click")}`;
        }
        // console.log(data);
      })

    }

  }
  caseModal: boolean = true;
  contactModal: boolean = true;
  // New Case modal
  myFunctionOne() {
    this.caseModal = false;
    this.contactModal = true;
    this.caseService.casepopupModal('casemodalOne');
  }
  //Create New Contact Modal
  contactModalOpen() {
    this.contactModal = false;
    this.caseModal = true;
    this.caseService.casepopupModal('contactModal');
  }


  popupModalClose() {
    this.caseService.modalInactive.subscribe(() => {
      this.caseModal = true;
      this.contactModal = true;
    })
  }
  //Role base access permission Module
  roleBasedAccessModule: any = [];
  roleNewcase: any;
  subscriptionRoleModule: Subscription | undefined;
  subscriptionPopupModal: Subscription | undefined;
  agentWebCaseAccess: any;
  myDashboardCaseAccess: any;
  knowledgeManagerCaseAccess: any;
  remindersClockCaseAccess: any;
  menuBloackCaseAccess: any;
  notificationCaseAccess: any;
  caseSettingCaseAccess: any;
  caseProfilePhotoCaseAccess: any;
  searchbarAccess: any;
  caseProfileIcon: any;
  roleBasedAccess() {
    this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
      // console.log('captrue Role base assess ==abhi== >', result)
      this.roleBasedAccessModule = result;
      [...this.roleBasedAccessModule].map(item => {
        if (item.FeatureName === 'CASE_CreateCases') { this.roleNewcase = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_AgentWebEngagement') { this.agentWebCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_MyDashboard') { this.myDashboardCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_KnowledgeManager') { this.knowledgeManagerCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_Reminders') { this.remindersClockCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_MenuBlockCases') { this.menuBloackCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_Notifications') { this.notificationCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_Settings') { this.caseSettingCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_ProfilePhoto') { this.caseProfilePhotoCaseAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_Search') { this.searchbarAccess = item.FeatureStatus; }
        else if (item.FeatureName === 'CASE_ProfilePhtIcon') { this.caseProfileIcon = item.FeatureStatus; }
      });
    })
  }
  //End Access permission 
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionRoleModule?.unsubscribe();
    this.subscriptionPopupModal?.unsubscribe();
  }
  secondsDisplay: any;
  minutesDisplay: any;
  temp: any;
  blinkTimer() {
    this.subscriptionPopupModal = this.caseService.timerModalPopup.subscribe((data: any) => {
      this.secondsDisplay = data.secondsDisplay;
      this.minutesDisplay = data.minutesDisplay;
      if (this.secondsDisplay == 0) {
        this.temp = 60;
      }else if(this.temp === undefined){
        this.temp = 60;
      }
      if (this.secondsDisplay) {
        if (this.temp != 0) {
          this.temp -= 1
        }
        else {
          this.temp = 59;
        }
      }
    })
  }


}