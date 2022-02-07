

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReportService } from 'src/app/service/report.service';
import { ClientService } from '../../service/client.service';
declare var CryptoJS: any;

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.scss']
})
export class ProductslistComponent implements OnInit {
  // agentForm: any;
  productForm!: FormGroup;
  submitted = false;
  roledata : any = [];
  teamsData : any= [];
  supportEmaildata : any = [];
  getProductsList : any = [];
  constructor(private ClientService: ClientService,private reportService:ReportService, private toastr: ToastrService,
    private modalService: NgbModal, private formBuilder: FormBuilder) { }
      ngOnInit(): void {
        this.getTeamData();
        this.getsupportEmail();
        this.getProductList();
    this.productForm = this.formBuilder.group({
      productName: [null],
      assignToTeam: [null],
      supportEmail: [null],
      description: [null],
    })
  }

  //Get Team Data
  getTeamData() {
    let ReqparameterTeams =
    {
      "TeamId": "",
      "UserId": "",
      "Flag": "Teams"
    }
    this.reportService.postData('GetTeamsData', ReqparameterTeams)
      .subscribe((res) => {
        this.teamsData = res.data;
        console.log('teamsData======>',this.teamsData);
      });
  }

 
  getsupportEmail() {
    let Reqparameter =
    {
      "ProductId": ""
    }
    this.reportService.postData('getProductMail', Reqparameter)
      .subscribe((res) => {
        console.log('getProductMail==>',res);
        
        this.supportEmaildata = res.data;
        console.log('supportEmaildata======>',this.supportEmaildata);


      });
  }

  getProductList(){

    let Reqparameter =
    {
      Flag: ""
    }
    this.reportService.postData('getProductMstrDetails', Reqparameter)
      .subscribe((res) => {
        console.log('getProductMstrDetailsssss==>',res);
        
        this.getProductsList = res.data;
        // console.log('teamsData======>',this.teamsData);
      });


  }
  // getAccounts() {

  //   let ReqparameterTimezone =
  //   {
  //     "flag": "",

  //   }
  //   this.ClientService.postData('getAccounts', ReqparameterTimezone)
  //     .subscribe((res) => {
  //       this.accountList = res.data;
  //       console.log(' ------------------------->', this.accountList)
  //     });


  // }



  /////////////////////////////////////////////////////////////////////////




  // demo: any = []
  // UpdateUserID: any;
  // editAgent(data) {
  //   this.closefrom();
  //   let req = {
  //     "UserId": data.UserID
  //   }
  //   this.ClientService.postData('editUser', req).subscribe(result => {
  //     this.UpdateUserID = result.data[0].UserID
  //     // this.getTeamsdata.find(item => )
  //     // '1,3,4,5'
  //     let temp = result.data[0].TeamID;
  //     let dataVal = temp.split(",");
  //     for (let i = 0; i < dataVal.length; i++) {
  //       // console.log(dataVal[i])
  //       this.getTeamsdata.filter((item => {
  //         if (item.TeamID == dataVal[i]) {
  //           this.demo.push(item)
  //         }

  //       }
  //       ))
  //     }
  //     //  => arr2.some(({ BusinessAttributeID: id2 }) => id2 === id1));
  //     this.agentForm.patchValue({
  //       FullName: result.data[0].FullName,
  //       RoleName: result.data[0].RoleID,
  //       EmailID: result.data[0].EmailID,
  //       PhoneNo: result.data[0].PhoneNo,
  //       IsActive: result.data[0].IsActive,
  //       timeZoneData: result.data[0].TimeZoneID,
  //       // Teamsdata :  result.data[0].TeamID,
  //       Address: result.data[0].Address,
  //       Signature: result.data[0].Signature,
  //       Title: result.data[0].Title,
  //       accountId: result.data[0].AccountID
  //     })
  //     this.url = result.data[0].ProfilePhotoUrl
  //     this.agentForm.patchValue({
  //       Teamsdata: this.demo
  //     })
  //   })
  // }
  // myProfile: any;
  // files: Array<any> = [];
  // url = 'assets/images/client-profile.png';
  // selectFile() {
  //   const fileUpload: any = document.getElementById('uploadFile') as HTMLInputElement;
  //   fileUpload.onchange = () => {
  //     for (let index = 0; index < fileUpload.files.length; index++) {
  //       const file = fileUpload.files[index];
  //       console.log(file);
  //       this.myProfile = file;

  //       var reader = new FileReader();

  //       reader.readAsDataURL(file); // read file as data url

  //       reader.onload = (event: any) => { // called once readAsDataURL is completed
  //         this.url = event.target.result;
  //       }

  //       // this.files.push(data: file);
  //     }
  //   };
  //   fileUpload.click();
  // }
  ////////////////////////////////////////////////////////////////////////////////////
  // selectAll() {
  //   this.agentForm.patchValue({
  //     Teamsdata: this.getTeamsdata
  //   })
  // }

  // : [null],
  //     assignToTeam: [null],
  //     supportEmail: [null],
  //     : [null],


  get f() { return this.productForm.controls; }
  save() {




      // this.toastr.success(result.data[0].Message);
    




    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    console.log(this.productForm.value)
console.log(this.productForm.value.assignToTeam)

let assignTo = this.teamsData.find(item => item.TeamID == this.productForm.value.assignToTeam.toString() )
// console.log(abc)
// let assignTo = this.productForm.value.assignToTeam;
// console.log()
// console.log()

//     let agentdata = this.productForm.value.supportEmail
//     let option: any = [];
//     let TeamsdataID = agentdata.map(e => {
//       option.push(e.EmailAccountID);
//       e['option'] = option;
//       return e.EmailAccountID;
//     })

console.log( '----------------------------->',this.productForm.value.supportEmail)

let Reqparametera = {
  ProductId : (this.UpdateproductID === undefined ? '' : this.UpdateproductID),
  ProductName : this.productForm.value.productName,
  ProductDesc :this.productForm.value.description,
  TeamId : assignTo.TeamID, 
  TeamName :assignTo.TeamName,
  SupportEmail : ( this.productForm.value.supportEmail === null ? '' : this.productForm.value.supportEmail.toString()),
  CreatedBy : JSON.parse(oLoggedInUser).UserID,
  IsActive :"1",
  IsDeleted :"0",
  Flag : (this.UpdateproductID === undefined ? 'INSERT' : 'UPDATE'),
}
    this.ClientService.postData('getCreateUpdateProduct', Reqparametera).subscribe(result => {
      // console.log('-------------->',result.data[0].Message)
      this.toastr.success(result.data[0].Message);
      this.closefrom()
      // this.modalService.dismissAll();
      // this.productForm.reset();
      // this.getProductList();
    })


 



  }

  // closefrom() {
  //   this.getAgentList()
  //   this.agentForm.reset();
  //   this.submitted = false;
  //   this.demo = [];
  //   this.url = 'assets/images/client-profile.png';
  // }
  
  //Validation for only number
  // numericOnly(event: any): boolean {
  //   const charCode = (event.which) ? event.which : event.keyCode;
  //   if (charCode === 101 || charCode === 69 || charCode === 45 || charCode === 43 ||
  //     charCode === 33 || charCode === 35 || charCode === 47 || charCode === 36 ||
  //     charCode === 37 || charCode === 38 || charCode === 40 || charCode === 41 || charCode === 42
  //     || charCode > 47 && (charCode < 48 || charCode > 57)) {
  //     return false;
  //   } else if (event.target.value.length >= 20) {
  //     return false;
  //   }
  //   return true;
  // }



  openVertically(agentModal) {
    this.modalService.open(agentModal, { centered: true, scrollable: true, size: 'lg' });
  }
  openVerticallyCentered(agentModal, data: any) {
    this.editProducts(data)
    this.modalService.open(agentModal, { centered: true, scrollable: true, size: 'lg' });
  }

  selectAll() {
    this.productForm.patchValue({
      supportEmail: this.supportEmaildata
    })
  }
  memberoption : any = []
  UpdateproductID : any;
  editProducts(data){ 
    console.log(data)
    // this.closefrom();
    this.UpdateproductID = data.ProductID

    let req = {
      "ProductID": data.ProductID
    }


    let Reqparameter =
    {
      "ProductId": data.ProductID
    }
    this.reportService.postData('getProductMail', Reqparameter)
      .subscribe((res) => {
        this.supportEmaildata = res.data;
      });



    this.ClientService.postData('getProductById', req).subscribe(result => {

      console.log(JSON.stringify(result.data[0].EmailAccountID))
      // console.log( Array.from(result.data[0].EmailAccountID))
      console.log(result.data[0].EmailAccountID)
      // this.memberoption = result.data[0].EmailAccountID
let abc :any = [];
abc.push(result.data[0].EmailAccountID);


const arr = JSON.parse(`[${abc}]`);
console.log(arr); // [2, 3, 7] 
      arr.map(item => {
      this.memberoption.push(item.toString());
    })
    console.log(this.memberoption)
    this.productForm.patchValue({
      productName  : data.ProductName,
      assignToTeam : data.TeamID.toString() ,
      description  : data.ProductDesc,
      supportEmail : this.memberoption
    })
console.log(this.productForm.value)

    })




 
    

    // productName: [null],
    // assignToTeam: [null],
    // supportEmail: [null],
    // description: [null],


  }




  deleteProduct(data){
console.log(data)
    let Reqparametera = {
      ProductId : data.ProductID,
      ProductName : "",
      ProductDesc :"",
      TeamId : "", 
      TeamName :"",
      SupportEmail : "",
      CreatedBy : "",
      IsActive :"",
      IsDeleted :"",
      Flag :"DELETE" ,
    }
        this.ClientService.postData('getCreateUpdateProduct', Reqparametera).subscribe(result => {
          // console.log('-------------->',result.data[0].Message)
          this.toastr.success(result.data[0].Message);
        this.closefrom()
         
        })
  }






  option : any =  [];
//   allSelected=false;
  selectAlla() {

 
this.supportEmaildata.map(item => {
  this.option.push(item.EmailAccountID.toString());
})
console.log( this.option)
    this.productForm.patchValue({
      supportEmail: this.option
    })
   
  }

closefrom() {
  this.productForm.reset();
   this.getProductList();
   this.modalService.dismissAll();
   this.UpdateproductID = undefined;
  //  this.supportEmaildata  = [];
}

checkSupportEmailExist(){
  if(this.supportEmaildata === null){  this.toastr.success('Support Email Is Already Mapped To The Product');}
 
}
}


