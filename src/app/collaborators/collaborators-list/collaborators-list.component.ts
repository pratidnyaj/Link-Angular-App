import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { stringify } from 'querystring';
import { ClientService } from '../../service/client.service';
declare var CryptoJS: any;
@Component({
  selector: 'app-collaborators-list',
  templateUrl: './collaborators-list.component.html',
  styleUrls: ['./collaborators-list.component.scss']
})
export class CollaboratorsListComponent implements OnInit {

  @ViewChild('select') select: any = MatSelect;
  p: number = 1;
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 10;
  absoluteIndex: number = 0;
  collaboratorsData : any[] = [];
  isCitiesControlVisible = true;


  // agentForm: any;
  collaboratorsForm!: FormGroup;
  submitted = false;
  constructor(private ClientService: ClientService, private toastr: ToastrService,
    private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getRoles();
    this.getTeams();
    this.gettimeZone();
    this.getCollaboratorList()
    this.getAccounts();
    this.collaboratorsForm = this.formBuilder.group({
      FullName: [null, Validators.required],
      RoleName: [null, Validators.required],
      EmailID: [null, [Validators.email,Validators.required]],
      PhoneNo: [null, Validators.required],
      IsActive: [false],
      timeZoneData: [null, Validators.required],
      Address: [''],
      Company: [''],
      Password: [null],
    })
  }

  getCollaboratorList() {
    let Reqparameter =
    {
      CollaboratorID :"",  
       UserId :"",  
       Flag:"GetAllData" 
    }
    this.ClientService.postData('getCollaboratorData', Reqparameter).subscribe(result => {
      this.collaboratorsData  = result.data;
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

  // handlePageChange(event: number) {
  //   console.log(event)
  //   this.currentPageNumber = event;
  //   let Reqparameter =
  //   {
  //     "AgentDesignation": "",
  //     "AgentRoles": "",
  //     "AgentTeams": "",
  //     "AgentStatus": "1",
  //     "PageNumber": this.currentPageNumber,
  //     "Limit": "10"
  //   }

  //   this.ClientService.postData('Getagents', Reqparameter).subscribe(result => {
  //     if (result.data) {
  //       this.collaboratorsData  = result.data.data;
  //       this.totalRec = result.data.totalRecord;
  //     }
  //     else {
  //       this.collaboratorsData  = [];
  //       this.totalRec = 0;
  //     }


  //   })
  // }


  deleteAgent(data) {
    let obj = {
        CollaboratorID :data.CollaboratorID,   
        CollaboratorEmailID :'',    
        CreatedBy :'',    
        Flag: 'DELETE' , 
        Designation :'',    
        CollaboratorName :'',    
        RoleID :'',  
        Password :'', 
        CollaboratorPhone :'',     
        Address :'',    
        TimeZoneID :'',    
        PhotoURL :'',    
        Company :'',    
        IsActive :'',     
        IsDeleted:'0',    
        UserType :''   
      }
    this.ClientService.postData('createUpdateCollaboratorData', obj).subscribe(result => {
      this.toastr.success(result.data[0].Message);
      this.getCollaboratorList();

    })
  }
  /////////////////////////////////////////////////////////////////////////
  openVerticallyCentered(collaboratorsModal, data: any) {
    console.log(data)
    this.editcollaborator(data)
    this.modalService.open(collaboratorsModal, { centered: true, scrollable: true, size: 'lg' });
  }
  openVertically(collaboratorsModal) {
    
    this.modalService.open(collaboratorsModal, { centered: true, scrollable: true, size: 'lg' });
  }


  demo: any = []
  CollaboratorID: any;
  editcollaborator(data) {
      this.CollaboratorID = data.CollaboratorID
      // this.getTeamsdata.find(item => )UpdateUserID
      // '1,3,4,5'
      //  => arr2.some(({ BusinessAttributeID: id2 }) => id2 === id1));
      this.collaboratorsForm.patchValue({
        FullName: data.CollaboratorName,
        RoleName: data.RoleID.toString(),
        EmailID: data.CollaboratorEmailID,
        PhoneNo: data.CollaboratorPhone,
        IsActive: data.IsActive,
        timeZoneData: data.TimeZoneID.toString(),
        Address: data.Address,
        Company: data.Company
      })
      this.url = data.photourl
  }


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
  // selectAll() {
  //   this.collaboratorsForm.patchValue({
  //     Teamsdata: this.getTeamsdata
  //   })
  // }
  get f() { return this.collaboratorsForm.controls; }
  save() {
    this.submitted = true;
    if (this.collaboratorsForm.valid) {
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      // console.table(this.form.value);
    }
    if (this.collaboratorsForm.invalid) {
      return;
    }
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let frmData = new FormData();
    frmData.append('CollaboratorID', (this.CollaboratorID === undefined ? '' : this.CollaboratorID));
    frmData.append('CollaboratorEmailID', this.collaboratorsForm.value.EmailID);
    frmData.append('CreatedBy', JSON.parse(oLoggedInUser).UserID);//SERRS
    frmData.append('Flag', (this.CollaboratorID === undefined ? 'INSERT' : 'UPDATE'));
    frmData.append('Designation', '');
    frmData.append('CollaboratorName', this.collaboratorsForm.value.FullName);
    frmData.append('RoleID', this.collaboratorsForm.value.RoleName);
    frmData.append('Password', (this.collaboratorsForm.value.Password === null ? '' : CryptoJS.MD5(this.collaboratorsForm.value.Password).toString()));
    frmData.append('CollaboratorPhone', this.collaboratorsForm.value.PhoneNo);
    frmData.append('Address', this.collaboratorsForm.value.Address);
    frmData.append('TimeZoneID', this.collaboratorsForm.value.timeZoneData);
    frmData.append('ProfilePhotoUrl', (this.myProfile === undefined ? '' : this.myProfile));
    frmData.append('Company', this.collaboratorsForm.value.Company);
    frmData.append('IsActive', (this.collaboratorsForm.value.IsActive === true ? '1' : '0'));
    frmData.append('IsDeleted', '0');
    frmData.append('UserType', JSON.parse(oLoggedInUser).UserType);
    this.ClientService.postDataCollaborator('newCollaborator', frmData).subscribe(result => {
      if (result.statusCode === 200) {
        this.toastr.success(result.message);
        this.modalService.dismissAll()
      }
      this.closefrom();
    })
  }

  closefrom() {
    this.getCollaboratorList()
    this.collaboratorsForm.reset();
    this.submitted = false;
    this.demo = [];
    this.myProfile = [];
    this.url = 'assets/images/client-profile.png';
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
//   selectAlla() {
//     console.log(this.collaboratorsForm.value);
    
// console.log(this.getTeamsdata)
 
// this.getTeamsdata.map(item => {
//   this.option.push(item.TeamID.toString());
// })
//     this.collaboratorsForm.patchValue({
//       Teamsdata: this.option
//     })
   
//   }

  

}
