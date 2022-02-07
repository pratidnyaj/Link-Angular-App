import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/service/client.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private ClientService: ClientService, private toastr: ToastrService,
     private app: AppService,private caseService : CaseService) { }

     subscriptionClientList : Subscription | undefined;
  //Holds list of contacts
  contacts: any[] = [];
  selectedContact: any = {};
  //captures the currently selected contact from the contacts list which is used to apply the active class.
  currentSelectedContactId: string = "";
  isContactistBlur: boolean = false;

  //This Subscription will trigger changes to dependent components.
  //Mimics clicking of contact from contact list.
  _syncContactId: string = "";
  syncSubscription: Subscription | undefined;

  ngOnInit(): void {
    
    this.syncSubscription = this.ClientService._syncContactId
      .subscribe(strContactId => {
        if (strContactId && this.contacts.length > 0) {
          this._syncContactId = strContactId;

          var oFilteredContact = this.contacts.filter(function (el) {
            return el.caseid == strContactId
          });
          this.selectContact(oFilteredContact[0]);
        }
      });

    this.getClientcontact();
    this.loadcaseListFilterData();
  }

  getClientcontact() {

    let obj = {
      "PageNumber" : "1",
     "Limit" : "10"
    }

    
    this.ClientService.postData('fetchClientContacts',obj)
    .subscribe(
      result => {

    // this.ClientService.getClientContactList()
    //   .subscribe(
    //     data => {
          console.log('=++++++++++++++++++++++12++++++++++++++++++++++++',result)
          if (result.data) {
            this.contacts = result.data.data;
            this.selectContact(result.data.data[0]);
          }
        },
        error => console.log('getclientcontact', error?.message))
      .add(() => {
        this.isContactistBlur = false;
      });
  }

  selectContact(oContact: any) {

    //trigger selected contact object details of all the subscribers.
    //client-info
    this.ClientService.emitContactData(oContact);
    console.log(oContact);
    this.currentSelectedContactId = oContact.ContactID;
    console.log('68===//====>',this.currentSelectedContactId)
    console.log(oContact.ContactID);
  }

  deleteContact(content: any) {
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";

    let request = {
      contactId: content.ContactID,
      userID:JSON.parse(oLoggedInUser).UserID
    }
    this.ClientService.postData('deleteContactApi', request).subscribe(
      data => {
        if (data.status) {
          this.toastr.success(data.message);
          this.getClientcontact();
        }
        else {
          this.toastr.error('Deletion of contact failed');
        }
      },
      error => console.log('deleteContact', error?.message))
      .add(() => {
        // this.ClientService.syncCaseId(caseId);
      });
  }
  loadcaseListFilterData(){

    this.subscriptionClientList = this.caseService._loadClientListFilter.subscribe((result) => {
  // this.subscriptionClientList = this.caseService.loadcaseListFilter.subscribe((data) => {
  console.log('data==========100==============',result);
  this.syncSubscription = this.ClientService._syncContactId
      .subscribe(strContactId => {
        if (strContactId && this.contacts.length > 0) {
          this._syncContactId = strContactId;

          var oFilteredContact = this.contacts.filter(function (el) {
            return el.caseid == strContactId
          });
          this.selectContact(oFilteredContact[0]);
        }
      });
    this.getClientcontact();
    
  })
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionClientList?.unsubscribe();
  }
  onScroll()  
  {  
    console.log("Scrolled");  
    // this.currentPage = this.currentPage + 1;  
    // this.getUpcomingEvent();
  }
}


