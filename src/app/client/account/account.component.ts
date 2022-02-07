import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { MatSelect } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { ClientService } from '../../service/client.service';
declare var CryptoJS: any;
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  // agentForm: any;


  p: number = 1;
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 10;
  absoluteIndex: number = 0;
  userMasterData: any[] = [];
  isCitiesControlVisible = true;



  accountForm!: FormGroup;
  submitted = false;
  cityData: any = [];
  accountData: any = [];
  serviceContractData : any = []
  accountList : any = [];
  constructor(private ClientService: ClientService, private toastr: ToastrService,
    private modalService: NgbModal, private formBuilder: FormBuilder,private router: Router) { }
  ngOnInit(): void {
    this.getCity();
    this.getAccountList();
    this.getAccountData();
    this.getServiceContract();
    this.accountForm = this.formBuilder.group({
      AccountName: [null, Validators.required],
      ServiceContractID: [null],
      Address: [null],
      Notes: [null],
      Domain: [null],
      AccountRep: [null],
      city: [null],
      accountID: [null],
      IsActive: [false],
    })
  }
  //get City details
  getCity() {
    let ReqparameterTimezone = {"flag": "City" }
    this.ClientService.postData('GetContactPageDep', ReqparameterTimezone)
      .subscribe((res) => {
        this.cityData = res.data;
      });
  }
  //get Account details
  getAccountData() {
    let ReqparameterAccount =
    {
      "flag": "ParentAccount"
    }
    this.ClientService.postData('GetAcctDetails', ReqparameterAccount)
      .subscribe((res) => {
        this.accountData = res.data;

      });



  }


  getAccountList(){
    let ReqparameterAccount =
    {
      "Flag": "GetAllAccounts",
    }
    this.ClientService.postData('GetAcctDetails', ReqparameterAccount)
      .subscribe((res) => {
        this.accountList =  res.data;
      console.log('================================================>>>>>>',res)
        // this.accountData = res.data;

      });
  }


  

  getServiceContract(){
    let ReqparameterAccount =
    {
      "Flag": "ServiceContract",
    }
    this.ClientService.postData('GetAcctDetails', ReqparameterAccount)
      .subscribe((res) => {
        this.serviceContractData = res.data;
console.log('------------------------>>>>',   this.serviceContractData)
        // this.accountData = res.data;

      });
  }

  /////////////////////////////////////////////////////////////////////////

  openVerticallyCentered(agentModal, data: any) {
    console.log('---------------->',data)
    this.editAccount(data)
    this.modalService.open(agentModal, { centered: true, scrollable: true, size: 'lg' });
  }
  openVertically(agentModal) {

    this.modalService.open(agentModal, { centered: true, scrollable: true, size: 'lg' });
  }
//File upload data
  myProfile: any;
  files: Array<any> = [];
  url = 'assets/images/emptyProfile.jpg';
  selectFile() {
    const fileUpload: any = document.getElementById('uploadFile') as HTMLInputElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        console.log(file);
        this.myProfile = file;

        var reader = new FileReader();

        reader.readAsDataURL(file); // read file as data url

        reader.onload = (event: any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }

        // this.files.push(data: file);
      }
    };
    fileUpload.click();
  }
  ////////////////////////////////////////////////////////////////////////////////////

  get f() { return this.accountForm.controls; }
  save() {
    this.submitted = true;
    if (this.accountForm.valid) {
    }
    if (this.accountForm.invalid) {
      return;
    }
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let frmData = new FormData();
    frmData.append('AccountId', (this.UpdateAcountID === undefined ? '' : this.UpdateAcountID));
    
    // frmData.append('AccountId','');
    frmData.append('AccountName', this.accountForm.value.AccountName);
    frmData.append('Address', this.accountForm.value.Address);
    frmData.append('City', this.accountForm.value.city);
    frmData.append('ServiceContractID', this.accountForm.value.ServiceContractID);
    frmData.append('Notes', this.accountForm.value.Notes);
    frmData.append('AccountDomain', this.accountForm.value.Domain);
    frmData.append('ParentAccountID', this.accountForm.value.accountID);
    frmData.append('IsActive', (this.accountForm.value.IsActive === true ? '1' : '0'));
    frmData.append('IsDeleted', '0');
    frmData.append('AccountRepContactID', this.accountForm.value.AccountRep);
    frmData.append('LogoUrl', this.myProfile);
    frmData.append('CreatedBy', JSON.parse(oLoggedInUser).UserID);//SERRS
    frmData.append('Flag', (this.UpdateAcountID === undefined ? 'INSERT' : 'UPDATE'));
 
    this.ClientService.postDataAccount('newAccount', frmData).subscribe(result => {
      if (result.statusCode === 200) {
        this.toastr.success(result.message);
        this.modalService.dismissAll()
      }
      this.closefrom();
    })
  }
  closefrom() {
    this.getAccountList();
    this.accountForm.reset();
    this.submitted = false;
    this.url = 'assets/images/emptyProfile.jpg';
  }
  // productView(id){
  //   this.router.navigate(['/accountView',id])
  // }
  UpdateAcountID: any;
  editAccount(data) {
    console.log(data)
    this.closefrom();
    this.UpdateAcountID = data.AccountID
    let req = {
      "AccountId": data.AccountID
    }
    this.ClientService.postData('editAccount', req).subscribe(result => {
      console.log(result)
 console.log('kkkkk',result.data[0])
      this.accountForm.patchValue({
        AccountName: result.data[0].AccountName,
        Address: result.data[0].Address,
        city: result.data[0].City,
        ServiceContractID: result.data[0].ServiceContractID.toString(),
        Notes: result.data[0].Notes,
        Domain: result.data[0].AccountDomain,
        accountID :  result.data[0].ParentAccountID,
        IsActive: result.data[0].IsActive,
        AccountRep: result.data[0].AccountRepContactID,
    
      })
if( result.data[0].LogoUrl != null){
      this.url = result.data[0].LogoUrl
    }


    })

  }
  deleteAccount(data){
  
    let frmData = new FormData();
    frmData.append('AccountId', data.AccountID);
    frmData.append('AccountName', '');
    frmData.append('Address', '');
    frmData.append('City','');
    frmData.append('ServiceContractID', '');
    frmData.append('Notes', '');
    frmData.append('AccountDomain', '');
    frmData.append('ParentAccountID', '');
    frmData.append('IsActive','');
    frmData.append('IsDeleted', '');
    frmData.append('AccountRepContactID','');
    frmData.append('LogoUrl', '');
    frmData.append('CreatedBy', '');
    frmData.append('Flag','DELETE');
 
    this.ClientService.postDataAccount('newAccount', frmData).subscribe(result => {
      if (result.statusCode === 200) {
        this.toastr.success(result.message);
        this.modalService.dismissAll()
      }
      this.closefrom();

    })
  }


}






