

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-object-manager',
  templateUrl: './object-manager.component.html',
  styleUrls: ['./object-manager.component.scss']
})
export class ObjectManagerComponent implements OnInit {
  p: number = 1;
  active = 1;
  buisnessobjectList : any = [];
  constructor(private router: Router, private modalService: NgbModal,private caseService : CaseService) { }

  ngOnInit(): void {
    this.getObjectManager();
  }
getObjectManager(){
let req= {
"objname":"Case",
  "Flag" : "Data"
}
this.caseService.postData('Getbuisnessobject',req).subscribe(result =>{
  console.log('result =======>',result.data)
  this.buisnessobjectList = result.data
  
})
}
  
  goToRoles() {
    this.router.navigate(['/roles'])
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true, scrollable: true, size: 'xl' });
  }
  createNewRole(){
    this.router.navigate(['/customizedField'])
  }
  objectDetails : any = [];
  selectedObj(){
    let req= {
        "objname":"Case",
        "Flag" : "Details"
      }
      this.caseService.postData('Getbuisnessobject',req).subscribe(result =>{
        console.log('result =======>',result.data)
        this.objectDetails = result.data  
      })
  }

  customFieldEdit(data){
    // console.log('customFieldEdit===>');
    this.router.navigate(['/customizedField'])
  // let sendDataToCustomField =  {
  //   caseID : "123"
  //  }
    this.caseService.emitCustomField(data);
  }


  deleteBusinessObj(data){
let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
let userId = JSON.parse(oLoggedInUser).UserID;
let req= {
AttributeDataType : data.AttributeDataType,
BusinessAttributeID : data.AttributeID,
DisplayName : data.DisplayName,
ListValue : '',
Flag : 'DeleteBusinessObj',
UpdatedBy : userId
}
this.caseService.postData('deleteBusinessObj',req).subscribe(result => {
  console.log('=========================>',result)
if(result.statusCode === 200 ){
this.selectedObj()
}
})
  }

}

