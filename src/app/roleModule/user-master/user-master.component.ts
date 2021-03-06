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
@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {
  @ViewChild('select') select: any = MatSelect;
  p: number = 1;
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 10;
  absoluteIndex: number = 0;
  userMasterData: any[] = [];
  isCitiesControlVisible = true;


  // agentForm: any;
  agentForm!: FormGroup;
  submitted = false;
  constructor(private ClientService: ClientService, private toastr: ToastrService,
    private modalService: NgbModal, private formBuilder: FormBuilder) { }
  //   agentForm = this.formBuilder.group({

  //     FullName :[''],
  //     RoleName :[''],
  //     EmailID :[''],
  //     PhoneNo : [''],
  //     status : 

  // });


  //   agentForm: FormGroup = new FormGroup({
  //     FullName: new FormControl(null),
  //     RoleName: new FormControl(null),
  //     EmailID: new FormControl(null),
  //     PhoneNo: new FormControl(null),
  //     IsActive : new FormControl(false),
  //     timeZoneData :  new FormControl(null),
  //     Teamsdata: new FormControl(null),
  //     Address: new FormControl(null),
  //     Signature :  new FormControl(null),
  //     Password : new FormControl(null),
  //     Title : new FormControl(null),
  //     accountId : new FormControl(null),

  // });






  ngOnInit(): void {
    this.getRoles();
    this.getTeams();
    this.gettimeZone();
    this.getAgentList()
    this.getAccounts();
    this.agentForm = this.formBuilder.group({
      FullName: [null, Validators.required],
      RoleName: [null, Validators.required],
      EmailID: [null, [Validators.email,Validators.required]],
      PhoneNo: [null, Validators.required],
      IsActive: [false],
      timeZoneData: [null, Validators.required],
      Teamsdata: [null, Validators.required],
      Address: [''],
      Signature: [''],
      Password: [null],
      Title: [''],
      accountId: [null, Validators.required],
    })
  }

  getAgentList() {
    let Reqparameter =
    {
      "AgentDesignation": "",
      "AgentRoles": "",
      "AgentTeams": "",
      "AgentStatus": "1",
      "PageNumber": "1",
      "Limit": "10"
    }
    this.ClientService.postData('Getagents', Reqparameter).subscribe(result => {
      if (result.data) {
        this.userMasterData = result.data.data;
        this.totalRec = result.data.totalRecord;
      }
      else {
        this.userMasterData = [];
        this.totalRec = 0;
      }
    })
  }

  roledata: any = [];
  getTeamsdata: any = [];
  timeZoneData: any = [];
  accountList: any = [];
  getRoles() {
    let req = {
      "Flag": ""
    }
    this.ClientService.postData('getRoles', req).subscribe(result => {
      this.roledata = result.data;
    })
  }


  getTeams() {
    let req = {
      "Flag": ""
    }
    this.ClientService.postData('getteamsUser', req).subscribe(result => {
      console.log(result);

      this.getTeamsdata = result.data;
      console.log('============================>get team === > ', this.getTeamsdata);

    })
  }
  gettimeZone() {
    let ReqparameterTimezone =
    {
      "flag": "TimeZone",

    }
    this.ClientService.postData('GetContactPageDep', ReqparameterTimezone)
      .subscribe((res) => {
        this.timeZoneData = res.data;
        // console.log('  console.log(this.timeZoneData)  console.log(this.timeZoneData)',this.timeZoneData)
      });

  }

  getAccounts() {

    let ReqparameterTimezone =
    {
      "flag": "",

    }
    this.ClientService.postData('getAccounts', ReqparameterTimezone)
      .subscribe((res) => {
        this.accountList = res.data;
        console.log(' ------------------------->', this.accountList)
      });


  }

  handlePageChange(event: number) {
    console.log(event)
    this.currentPageNumber = event;
    let Reqparameter =
    {
      "AgentDesignation": "",
      "AgentRoles": "",
      "AgentTeams": "",
      "AgentStatus": "1",
      "PageNumber": this.currentPageNumber,
      "Limit": "10"
    }

    this.ClientService.postData('Getagents', Reqparameter).subscribe(result => {
      if (result.data) {
        this.userMasterData = result.data.data;
        this.totalRec = result.data.totalRecord;
      }
      else {
        this.userMasterData = [];
        this.totalRec = 0;
      }


    })
  }


  deleteAgent(data) {
    let req = {
      AgentId: data.UserID,
      Flag: 'DeleteAgent'
    }
    this.ClientService.postData('deleteAgent', req).subscribe(result => {
      console.log('------------------------------------------------------>', result)

      this.toastr.success('Agent Deleted Successfully');
      this.getAgentList();

    })
  }
  /////////////////////////////////////////////////////////////////////////




  openVerticallyCentered(agentModal, data: any) {
    console.log(data)
    this.editAgent(data)
    this.modalService.open(agentModal, { centered: true, scrollable: true, size: 'lg' });
  }
  openVertically(agentModal) {
    
    this.modalService.open(agentModal, { centered: true, scrollable: true, size: 'lg' });
  }


  demo: any = []
  UpdateUserID: any;
  editAgent(data) {
    this.closefrom();
    let req = {
      "UserId": data.UserID
    }
    this.ClientService.postData('editUser', req).subscribe(result => {
      this.UpdateUserID = result.data[0].UserID
      // this.getTeamsdata.find(item => )
      // '1,3,4,5'
      let temp = result.data[0].TeamID;
      let dataVal = temp.split(",");
      for (let i = 0; i < dataVal.length; i++) {
        // console.log(dataVal[i])
        this.getTeamsdata.filter((item => {
          if (item.TeamID == dataVal[i]) {
            this.demo.push(item)
          }

        }
        ))
      }


      //  => arr2.some(({ BusinessAttributeID: id2 }) => id2 === id1));
      this.agentForm.patchValue({
        FullName: result.data[0].FullName,
        RoleName: result.data[0].RoleID.toString(),
        EmailID: result.data[0].EmailID,
        PhoneNo: result.data[0].PhoneNo,
        IsActive: result.data[0].IsActive,
        timeZoneData: result.data[0].TimeZoneID.toString(),
        // Teamsdata :  result.data[0].TeamID,
        Address: result.data[0].Address,
        Signature: result.data[0].Signature,
        Title: result.data[0].Title,
        accountId: result.data[0].AccountID
      })
      this.url = result.data[0].ProfilePhotoUrl
let memberoption : any = []
this.demo.map(item => {
  memberoption.push(item.TeamID.toString());
})
      this.agentForm.patchValue({
        Teamsdata: memberoption
      })








    })

  }


  myProfile: any;
  files: Array<any> = [];
  url = 'assets/images/client-profile.png';
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
  selectAll() {
    this.agentForm.patchValue({
      Teamsdata: this.getTeamsdata
    })
  }
  get f() { return this.agentForm.controls; }
  save() {
  
    
// console.log(this.agentForm.invalid);

    // this.submitted = true;
    // if (this.agentForm.invalid) {
    //   return;
    // }


    this.submitted = true;
    if (this.agentForm.valid) {
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      // console.table(this.form.value);
    }
    // console.log(this.f.primaryPhone.value)
    // console.log(this.f.altPhone1.value)
    

    if (this.agentForm.invalid) {
      return;
    }




    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    console.log(this.agentForm.value);
    let agentdata = this.agentForm.value.Teamsdata
    // let option: any = [];
    // let TeamsdataID = agentdata.map(e => {
    //   option.push(e.TeamID);
    //   e['option'] = option;
    //   return e.TeamID;
    // })
    let frmData = new FormData();
    frmData.append('UserID', (this.UpdateUserID === undefined ? '' : this.UpdateUserID));
    frmData.append('Title', this.agentForm.value.Title);
    frmData.append('FullName', this.agentForm.value.FullName);
    frmData.append('EmailID', this.agentForm.value.EmailID);
    frmData.append('PhoneNo', this.agentForm.value.PhoneNo);
    frmData.append('Address', this.agentForm.value.Address);
    frmData.append('Password', (this.agentForm.value.Password === null ? '' : CryptoJS.MD5(this.agentForm.value.Password).toString()));
    frmData.append('RoleID', this.agentForm.value.RoleName);
    frmData.append('TimeZoneID', this.agentForm.value.timeZoneData);
    frmData.append('Signature', this.agentForm.value.Signature);
    frmData.append('CreatedBy', JSON.parse(oLoggedInUser).UserID);//SERRS
    frmData.append('UpdatedBy', '');
    frmData.append('DeletedBy', '');
    frmData.append('AccountID', this.agentForm.value.accountId);
    frmData.append('ProfilePhotoUrl', this.myProfile);
    frmData.append('TeamIDsList', this.agentForm.value.Teamsdata.toString());
    frmData.append('IsActive', (this.agentForm.value.IsActive === true ? '1' : '0'));
    frmData.append('QueryFlag', (this.UpdateUserID === undefined ? 'INSERT' : 'UPDATE'));
    this.ClientService.postDataAgent('newAgent', frmData).subscribe(result => {
      if (result.statusCode === 200) {
        this.toastr.success(result.message);
        this.modalService.dismissAll()
      }
      //  this.agentForm.reset();
      this.closefrom();
    })
  }

  closefrom() {
    this.getAgentList()
    this.agentForm.reset();
    this.submitted = false;
    this.demo = [];
    this.myProfile = [];
    this.url = 'assets/images/emptyProfile.jpg';
  }
  
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
  option : any =  [];
  allSelected=false;
  selectAlla() {
    console.log(this.agentForm.value);
    
console.log(this.getTeamsdata)
 
this.getTeamsdata.map(item => {
  this.option.push(item.TeamID.toString());
})
    this.agentForm.patchValue({
      Teamsdata: this.option
    })
   
  }

  

}
