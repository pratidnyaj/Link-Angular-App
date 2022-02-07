import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-contact-info-view',
  templateUrl: './contact-info-view.component.html',
  styleUrls: ['./contact-info-view.component.scss']
})
export class ContactInfoViewComponent implements OnInit {

  p: number = 1;
  // totalRec: number = 0;
  // currentPageNumber: number = 1;
  // perPageCnt: number = 10;
  // absoluteIndex: number = 0;
  // userMasterData: any[] = [];
  // isCitiesControlVisible = true;
  ///===========================================
  accountId: any;
  contactList : any = [];
  oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
  constructor(private activatedRoute: ActivatedRoute,private ClientService: ClientService,
    private modalService : NgbModal, private formBuilder: FormBuilder,private toastr: ToastrService,private router:Router){
    this.accountId = this.activatedRoute.snapshot.params.id;
    console.log(this.accountId)
   }

  ngOnInit(): void {
this.getcontactList();
this.contactSearchbarList();
  }
  openVertically(contactModal){
    this.modalService.open(contactModal, { centered: true, scrollable: true, size: 'sm' });
  }
  searchText;
  searchContactList  : any = [];


  // AccountID
getcontactList(){
    let ReqparameterAccount =
    {
      "AccountId": this.accountId
    }
    this.ClientService.postData('GetAcctContactDetails', ReqparameterAccount)
      .subscribe((res) => {
        this.contactList = res.data;
        console.log('52================>',this.contactList)
      });
  }



  contactSearchbarList(){
    let ReqparameterAccount =
    {
      "AccountId": ''

    }
    this.ClientService.postData('GetAcctContactDetails', ReqparameterAccount)
      .subscribe((res) => {
        // console.log( res.data);
        this.searchContactList = res.data
        // this.contactList = res.data;
        console.log('searchContactList== ',this.searchContactList.length)
        console.log('searchContactList== ',this.searchContactList)
      });
  }
  selectedVal : any = [];
  isAllSelectedAdmin(val) {
    console.log(val.ContactID)
    this.selectedVal.push(val.ContactID);

  }

  saveContact(){
    console.log(this.selectedVal.toString());

    let ReqparameterAccount =
    {
      "ContactID": this.selectedVal.toString(),
      "AccountID":this.accountId,
      "CreatedBy":JSON.parse(this.oLoggedInUser).UserID, 

    }
    this.ClientService.postData('createAcctContact', ReqparameterAccount)
      .subscribe((result) => {
        this.toastr.success(result.data[0].Message);
   this.closefrom();
     
      });

  }

  deleteContactinfo(data){
    // console.log(data.ContactID);
    
    let ReqparameterAccount =
    {
      "ContactID":data.ContactID.toString(),
    }
    this.ClientService.postData('deleteAcctContact', ReqparameterAccount)
      .subscribe((result) => {
        this.toastr.success(result.data[0].Message);
       this.closefrom();
     
      });

  }

  closefrom() { 
    this.getcontactList();
    this.selectedVal= [];
    this.modalService.dismissAll()
  }

  editContactinfo(data){
console.log(data);
    this.ClientService.emitClientId(data);
    this.router.navigate(['/client'])

  }

}
