import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.scss']
})
export class RoleMasterComponent implements OnInit {
  p: number = 1;
  active = 1;
  rolemaster : any = [];
  constructor(private router: Router, private modalService: NgbModal,
    private caseService : CaseService,private formBuilder: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    let request = {
      "Flag": ""
  };
    this.caseService.postData('getRoles', request).subscribe(result => {
   console.log('datadatadata++++++++',result.data);
   this.rolemaster =  result.data;
    });


  }
  goToRoles() {
    this.router.navigate(['/roles'])
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, scrollable: true, size: 'xl' });
  }


rolesEditForm = this.formBuilder.group({
  RoleName: [''],
  Description: [''],
 
});

caseData : any = [];
adminData : any = [];
clientsData : any = [];
reportsData : any = [];
RoleID : any;
// selected role Type data fetch 
selectedRoles(items){
console.log('--------------->',items);
this.RoleID = items.RoleID;
this.rolesEditForm.setValue({
  RoleName :items.RoleName,
  Description : items.Description
 })
 
 let request = {
  // "Flag": "",
  // "ModuleID" : "",
  "RoleID" : items.RoleID
};
this.caseService.postData('viewRoleFeatures', request).subscribe(result => {
let roleData = result.data;
let convertToBollenFlag = roleData.map(items=>{
  if( items.IsCheckedFlag === 'true' ){
    return { ...items, isSelected : true
    }  
  }else{
    if( items.IsCheckedFlag === 'false' ){
      return { ...items, isSelected : false }  
    }
  }
})
console.log(convertToBollenFlag);
 this.caseData =  convertToBollenFlag.filter(items => items.ModuleName === 'Cases' )
 this.adminData =  convertToBollenFlag.filter(items => items.ModuleName === 'Admin' )
 this.clientsData =  convertToBollenFlag.filter(items => items.ModuleName === 'Clients' )
 this.reportsData =  convertToBollenFlag.filter(items => items.ModuleName === 'Reports' )
});
} 

caseChecklist: any;
caseCheckedList: any = [];
isSelected: any;
combineCaseAdminClientReportarr : any = [];
//CaseData
isAllSelectedCase(val, isChecked) {
  this.isSelected = isChecked;
  for(var i=0;i<this.caseData.length;i++ ){
    if( this.caseData[i].FeatureDescription==val.FeatureDescription){
console.log('check boxxx');
   this.caseData[i].isSelected=!this.caseData[i].isSelected;
    }
 }
}


//AdminData
isAllSelectedAdmin(val, isChecked) {
  this.isSelected = isChecked;
  for(var i=0;i<this.adminData.length;i++ ){
    if( this.adminData[i].FeatureDescription==val.FeatureDescription){
console.log('check boxxx');
   this.adminData[i].isSelected=!this.adminData[i].isSelected;
    }
 }

}
//clientsData
isAllSelectedClients(val, isChecked) {
  this.isSelected = isChecked;
  for(var i=0;i<this.clientsData.length;i++ ){
    if( this.clientsData[i].FeatureDescription==val.FeatureDescription){
console.log('check boxxx');
   this.clientsData[i].isSelected=!this.clientsData[i].isSelected;
    }
 }

}
//
isAllSelectedreports(val, isChecked) {
  this.isSelected = isChecked;
  for(var i=0;i<this.reportsData.length;i++ ){
    if( this.reportsData[i].FeatureDescription==val.FeatureDescription){
console.log('check boxxx');
   this.reportsData[i].isSelected=!this.reportsData[i].isSelected;
    }
 }

}

roleUpdate(){
  this.combineCaseAdminClientReportarr = [...this.caseData, ...this.adminData, ...this.clientsData , ...this.reportsData];
  let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
  let userId = JSON.parse(oLoggedInUser).UserID;
let isSelectedCheckBox = this.combineCaseAdminClientReportarr.filter(items => items.isSelected === true);
let featureID = isSelectedCheckBox.map(items => items.FeatureID)
let reqParameter = {
RoleID : this.RoleID,
RoleName : this.rolesEditForm.value.RoleName,
Description : this.rolesEditForm.value.Description,
UpdatedBy : userId,
FeatureId : featureID.join()
}
this.caseService.postData('updateRoleFeatures', reqParameter).subscribe(result => {
if(result.data[0].Message === 'Role Feature Updated Successfully'){
  this.toastr.success(result.data[0].Message);
}else{
  this.toastr.error('Error');
}
})
}
}