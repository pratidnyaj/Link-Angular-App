import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from 'src/app/service/client.service';
import { ToastrService } from 'ngx-toastr';
import { pipe, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { Router } from '@angular/router';

declare const $: any;
@Component({
  selector: 'app-contact-case-modal',
  templateUrl: './contact-case-modal.component.html',
  styleUrls: ['./contact-case-modal.component.scss']
})
export class ContactCaseModalComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  subscriptionPopupModal: Subscription | undefined;
  timeZoneData: any = [];
  cityData: any = [];
  languageData: any = [];
  constructor(private formbuilder: FormBuilder, private clientservice: ClientService,
    private toastr: ToastrService, private caseService: CaseService, private router: Router) { }

  ngOnInit(): void {
    this.getTimeZone();
    this.getCity();
    this.getLanguage();
    this.initializedata();
    this.contactModalOpen();
  }

  initializedata() {

    this.form = this.formbuilder.group({
      userType: "agent",//this.userType;
      sessionRequired: [''],
      contactName: ['', Validators.required],
      facebook: ['', Validators.required],
      accountId: "",
      language: ['', Validators.required],
      primaryEmail: ['', [Validators.required, Validators.email]],
      altEmail1: ['', [Validators.email]],
      primaryPhone: ['', Validators.required],
      altPhone1: [''],
      city: ['', Validators.required],
      timeZoneId: ['', Validators.required],
      designation: "",
      address: ['', Validators.required],
      status: true,
      Blockedstatus: false,
      type: [''],
      notes: [''],
      photo: [''],
      UserID: [''],
      password: [''],
      reqID: [''],
      Instagram: [''],
      Whatsapp: [''],
      Twitter: [''],
      altEmail2: [''],
      altEmail3: [''],
      altEmail4: [''],
      altPhone3: [''],
      altPhone4: [''],
      altPhone2: [''],
      IntrRequestOrigin: ['']


      //  phone2: ['', Validators.required],
    },

    );


  }

  //get TimeZone Data 
  getTimeZone() {

    let ReqparameterTimezone =
    {
      "flag": "TimeZone",

    }
    this.clientservice.postData('GetContactPageDep', ReqparameterTimezone)
      .subscribe((res) => {
        this.timeZoneData = res.data;
      });

  }
  getCity() {

    let ReqparameterTimezone =
    {
      "flag": "City",

    }
    this.clientservice.postData('GetContactPageDep', ReqparameterTimezone)
      .subscribe((res) => {
        this.cityData = res.data;
      });

  }

  getLanguage() {

    let ReqparameterTimezone =
    {
      "flag": "Language",

    }
    this.clientservice.postData('GetContactPageDep', ReqparameterTimezone)
      .subscribe((res) => {
        this.languageData = res.data;
      });

  }

  get f() { return this.form.controls; }
  onSubmit() {
   
    
    this.submitted = true;
    if (this.form.valid) {
      // alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      // console.table(this.form.value);
    }
    // console.log(this.f.primaryPhone.value)
    // console.log(this.f.altPhone1.value)
    

    if (this.form.invalid) {
      return;
    }
    // else
    // {
    //   if (this.f.primaryPhone.value == this.f.altPhone1.value) {
    //   return  this.toastr.error('Alt.Phone no Should not be same as Phone no in contact');
    //   }
    // }
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";

    // let oContactinRq = {
    //   "userType": JSON.parse(oLoggedInUser).UserType,//"agent",//this.userType;
    //   // "sessionRequired": "",
    //   "contactName": this.f.contactName.value,
    //   "facebook": this.f.facebook.value,
    //   "language": this.f.language.value,
    //   "primaryEmail": this.f.primaryEmail.value,
    //   "altEmail1": this.f.altEmail1.value,
    //   "primaryPhone": this.f.primaryPhone.value,
    //   "altPhone1": this.f.altPhone1.value,
    //   "city": this.f.city.value,
    //   "timeZoneId": this.f.timeZoneId.value,
    //   "address": this.f.address.value,
    //   "status": "1",
    //   "Blockedstatus": "0",
    //   "notes": this.f.notes.value,
    //   "photo": "",
    //   // "password": "aeae85d0e4ac745da16cff311ac7ea44",
    //   "reqID": "",
    //   "Instagram": "Instagram",
    //   "Whatsapp": "Whatsapp",
    //   "Twitter": "Twitter",
    //   "type": "Contact",
    //   "altEmail2": "",
    //   "altEmail3": "",
    //   "altEmail4": "",
    //   "altPhone3": "",
    //   "altPhone4": "",
    //   "altPhone2": "",
    //   // "accountId":"",
    //   "designation": "",
    //   "UserId": JSON.parse(oLoggedInUser).UserID,
    //   // "IntrRequestOrigin":"API"
    // };



    let frmData = new FormData();
    frmData.append('userType',JSON.parse(oLoggedInUser).UserType);
    frmData.append('contactName',this.f.contactName.value);
    frmData.append('facebook',this.f.facebook.value);
    frmData.append('language',this.f.language.value);
    frmData.append('primaryEmail',this.f.primaryEmail.value);
    frmData.append('altEmail1',this.f.altEmail1.value);
    frmData.append('primaryPhone', this.f.primaryPhone.value);
    frmData.append('altPhone1',this.f.altPhone1.value);
    frmData.append('city',this.f.city.value);
    frmData.append('timeZoneId',this.f.timeZoneId.value);
    frmData.append('address',this.f.address.value);
    frmData.append('status',"1");
    frmData.append('Blockedstatus',"0");
    frmData.append('notes',this.f.notes.value);
    // frmData.append('photo',"");
    frmData.append('reqID',"");
    frmData.append('Instagram',"Instagram");
    frmData.append('Whatsapp',"Whatsapp");
    frmData.append('Twitter',"Twitter");
    frmData.append('type',"Contact");
    frmData.append('altEmail2',"");
    frmData.append('altEmail3',"");
    frmData.append('altEmail4',"");
    frmData.append('altPhone3',"");
    frmData.append('altPhone4',"");
    frmData.append('altPhone2',"");
    frmData.append('designation',"");
    frmData.append('UserId',JSON.parse(oLoggedInUser).UserID);
    frmData.append('clientProfile',this.myProfile);
   
















    if (this.f.primaryPhone.value != this.f.altPhone1.value && this.f.primaryEmail.value != this.f.altEmail1.value) {
    //   this.toastr.error('Alt.Phone no Should not be same as Phone no in contact');
    // }else{
    this.clientservice.postDataClient('newContact', frmData).subscribe(data => {
      // this.clientservice.postData('SaveNewContact', oContactinRq).subscribe(data => {
      // this.ClientService.CreateContact(this.oContactinRq).subscribe(data => {
      if (data.message) {
        this.toastr.success("Contact Added Successfully");
        this.form.reset();
        this.caseService.clientListFilterReload('clientCreated');
        this.router.navigate(['/client']);
        this.closeModal();
      }
      else {
        this.toastr.error('Contact Is Not Added');
        this.form.reset();
      }
      $('#contactModal').modal('hide');

    })

  }
  }

  // contactModalOpen() {
  //   $('#contactModal').modal('show')
  // }
  closeModal() {
    $('#contactModal').modal('hide')
    this.caseService.modalcloseInactive();
  }


  contactModalOpen() {
    $('#contactModal').modal('show');
    this.subscriptionPopupModal = this.caseService.popupModalActive.subscribe((data) => {
      $('#contactModal').modal('show');
    })
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionPopupModal?.unsubscribe();
  }


//   previewFile(input:any){
//     console.log('ksisksi');
    
//     var file = $("input[type=file]").get(0).files[0];

//     if(file){
//       var reader = new FileReader();

//       reader.onload = function(){
//           $("#previewImg").attr("src", reader.result);
//       }

//       reader.readAsDataURL(file);
//     }
// }
myProfile : any;
files: Array<any> = [];
url = 'assets/images/emptyProfile.jpg';
selectFile() {
  const fileUpload : any = document.getElementById('uploadFile') as HTMLInputElement;
  fileUpload.onchange = () => {
    for (let index = 0; index < fileUpload.files.length; index++) {
      const file = fileUpload.files[index];
      console.log(file);
this.myProfile = file;

      var reader = new FileReader();

            reader.readAsDataURL(file); // read file as data url
      
            reader.onload = (event : any) => { // called once readAsDataURL is completed
              this.url = event.target.result;
            }
      
      // this.files.push(data: file);
    }
  };
  fileUpload.click();
}


// url = '';
//   onSelectFile(event : any) {
//     if (event.target.files && event.target.files[0]) {
//       var reader = new FileReader();

//       reader.readAsDataURL(event.target.files[0]); // read file as data url

//       reader.onload = (event : any) => { // called once readAsDataURL is completed
//         this.url = event.target.result;
//       }
//     }
//   }


}
