import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/service/client.service';
import { ToastrService } from 'ngx-toastr';
import{CONTACTRQ} from 'src/app/shared/header/headerDataModel';
import { Router } from '@angular/router';

declare var Gen_validations: any;

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
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
  
  
  selectedContact: any = {};
  //captures the currently selected contact from the contacts list which is used to apply the active class.
  currentSelectedContactId: string = "";
  isContactistBlur: boolean = false;


  constructor(private ClientService: ClientService, private modalService: NgbModal, 
    private toastr: ToastrService,private router : Router) {


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


  }
  closeResult: string = '';
  
  //This Subscription will trigger changes to dependent components.
  //Mimics clicking of case from contact list.
  _syncContactId: string = "";
  syncSubscription: Subscription | undefined;
  subscription: Subscription | undefined;
  ngOnInit(): void {
   
 
  }
  createContact() {
let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";

this.oContactinRq.userType = "agent"//this.userType;
      this.oContactinRq.sessionRequired = this.sessionRequired;
      this.oContactinRq.contactName = this.contactName;
      this.oContactinRq.primaryEmail = this.primaryEmail;
      this.oContactinRq.accountId =this.accountId ;
      this.oContactinRq.language =this.language;
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
      this.oContactinRq.notes =this.notes;
      this.oContactinRq.photo = this.photo;
      this.oContactinRq.password = this.password;
      this.oContactinRq.type = "Contact";
      this.oContactinRq.reqID = this.reqID;
      this.oContactinRq.facebook = this.facebook;
      this.oContactinRq.Instagram = this.Instagram;
      this.oContactinRq.Whatsapp = this.Whatsapp;
      this.oContactinRq.Twitter = this.Twitter;
      this.oContactinRq.UserID =  JSON.parse(oLoggedInUser).UserID;
      this.ClientService.postData('SaveNewContact', this.oContactinRq).subscribe(data => {
    // this.ClientService.CreateContact(this.oContactinRq).subscribe(data => {
      console.log('contact-info', data);
      if (data.status) {
        console.log('clientclientclientclientclientclient');
        
        this.router.navigate(['/client']);
        this.toastr.success("Contact Added Successfully");
        this.ClientService.emitContactData(this.oContactinRq);
      }
      // console.log(data);
    })
  }
  
  }

