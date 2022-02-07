import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
    selector: 'app-customized-field',
    templateUrl: './customized-field.component.html',
    styleUrls: ['./customized-field.component.scss']
})
export class CustomizedFieldComponent implements OnInit {

    selectedTeam: any = [];
    addCustomizedFields: FormGroup = new FormGroup({
        lableName: new FormControl(null, [Validators.required]),
        dataType: new FormControl(null, [Validators.required]),
        displayName: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),
        options: new FormControl(null, [Validators.required]),
        visibleToAgent : new FormControl(false, [Validators.requiredTrue]),
        visibleToContact : new FormControl(false, [Validators.requiredTrue]),
        name :  new FormControl(null)
    });
    constructor(private modalService: NgbModal,private caseService : CaseService,private toastr: ToastrService,
        private router:Router) { }
    dataTypeObj = [
        // { name: 'Textbox' },
        // { name: 'List' }

        { name: 'text' },
        { name: 'list' } 

    ];
    selectedCity: any;
    ngOnInit(): void {
        this.customFieldData();
    }
    SetChoice = false;
    EditChoices = false;
    setchoice(event: any) {
        console.log(event);
        
        if (event === 'list') {
            console.log('SetChoiceSetChoiceSetChoice');

            this.SetChoice = true;
        } else {
            this.SetChoice = false;
        }
    }
    TheChosenchoice: Array<string> = [];
    AddChoice = false;
    addChoice(val: any, type: any) {
        if (type === 0) {
            if (val.length !== 0) {
                this.AddChoice = true;
                if (this.TheChosenchoice.length === 0) {
                    this.TheChosenchoice.push(val);
                } else {
                    if (this.TheChosenchoice.includes(val) === true) {
                        alert(val + ' already exists');
                    } else {
                        this.TheChosenchoice.push(val);
                    }
                }
            } else {
                this.AddChoice = false;
            }
        }
        this.addCustomizedFields.get('name')?.reset();
   
        console.log('----------------->',this.TheChosenchoice);
        
    }
    removeMe(formal: any, actual: any, type: any) {
        if (type === 0) {
            if (this.TheChosenchoice.includes(actual)) {
                this.TheChosenchoice.splice(this.TheChosenchoice.indexOf(actual), 1);
            }
        }
    }
    saveCustomizedfield(){
        if (this.addCustomizedFields.controls.dataType.value === 'list') {
            this.addCustomizedFields.patchValue({options: this.TheChosenchoice });
        }
        console.log('------------------------->',this.addCustomizedFields.value)

        let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
        let userId = JSON.parse(oLoggedInUser).UserID;
    
console.log('this.attributeIDthis.attributeIDthis.attributeID====>',this.attributeID)



console.log(this.attributeID)

if(this.attributeID === undefined){
    let requestParameter = {
        AttributeName :this.addCustomizedFields.value.lableName,
        DisplayName:this.addCustomizedFields.value.displayName,
        AttributeDesc :this.addCustomizedFields.value.description, 
        AttributeDataType : this.addCustomizedFields.value.dataType,
        AttributeMaxLength  :"",
        DefaultValue :"",
        CheckSpelling  :"0",
        Order  :"0",
        VisibleToAgent  :(this.addCustomizedFields.value.visibleToAgent == true) ? "1" : "0",
        VisibleToContact  :(this.addCustomizedFields.value.visibleToContact == true) ? "1" : "0",
        ListValue : (this.addCustomizedFields.value.options == null) ? "" :  this.addCustomizedFields.value.options.join() ,
        ParentAttributeListID  :"",
        CreatedBy  :userId
        
    }

    this.caseService.postData('createBusinessObj',requestParameter).subscribe(result =>{
        this.toastr.success('Business Object Created Successfully');
        this.router.navigate(['/ObjectManager']);
        this.addCustomizedFields.reset();
    })
}else{


    let requestParameter = {
        AttributeId : (this.attributeID === undefined) ? "" : this.attributeID,
        AttributeName :this.addCustomizedFields.value.lableName,
        DisplayName:this.addCustomizedFields.value.displayName,
        AttributeDesc :this.addCustomizedFields.value.description, 
        AttributeDataType : this.addCustomizedFields.value.dataType,
        AttributeMaxLength  :"",
        DefaultValue :"",
        CheckSpelling  :"0",
        Order  :"0",
        VisibleToAgent  :(this.addCustomizedFields.value.visibleToAgent == true) ? "1" : "0",
        VisibleToContact  :(this.addCustomizedFields.value.visibleToContact == true) ? "1" : "0",
        ListValue : (this.addCustomizedFields.value.options == null) ? "" :  this.addCustomizedFields.value.options.join() ,
        ParentAttributeListID  :"",
        CreatedBy  :userId
        
    }
    this.caseService.postData('updateBusinessObj',requestParameter).subscribe(result =>{
        this.toastr.success('Business Object Created Successfully');
       this.router.navigate(['/ObjectManager']) 
       this.addCustomizedFields.reset();
    //    this.router.navigateByUrl('/ObjectManager');
       
    })
}




// if(localStorage.getItem('customizedFields') != null){
//     console.log(localStorage.getItem("customizedFields"))
//     let y : any= localStorage.getItem("customizedFields");
//    let addCustomizedFieldss =  JSON.stringify(this.addCustomizedFields.value);
    
   
// let arr = JSON.parse(y);
// let temp = [] as  any;
// for(let i=0;i<arr.length;i++){
//     console.log(arr[i])
//     temp.push(arr[i]);
// }
// temp.push(this.addCustomizedFields.value )
// console.log(temp)
//     localStorage.setItem("customizedFields", JSON.stringify(temp));
// }else{
    
//     localStorage.setItem("customizedFields", JSON.stringify([this.addCustomizedFields.value]));
// }
this.addCustomizedFields.reset()
    }
    subscriptionRoleModule: Subscription | undefined;
    TheChosenchoiceEditList : any = []
    attributeID : any ;
    customFieldData(){
    this.subscriptionRoleModule = this.caseService._editcustomFieldData.subscribe((data :any) => {
        if(data){
this.addCustomizedFields.patchValue({
        lableName: data['AttributeName'],
        dataType: data['AttributeDataType'],
        displayName: data['DisplayName'],
        description: data['AttributeDesc'],
        visibleToAgent :data['VisibleToAgent'],
        visibleToContact : data['VisibleToContact']
})
this.selectedTeam = data['AttributeDataType']
this.attributeID = data['AttributeID']
}


if(data['AttributeDataType'] === 'list'){

this.getAttributeDatalist()


}

      })
    }

    removeMeList(data){
        let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
        let userId = JSON.parse(oLoggedInUser).UserID;
let req= {
    AttributeDataType : data.AttributeDataType,
    BusinessAttributeID : data.BusinessAttributeID,
    DisplayName : data.DisplayName,
    ListValue : data.ListValue,
    Flag : 'DeleteBusinessObjList',
    UpdatedBy : userId
}
this.caseService.postData('deleteBusinessObj',req).subscribe(result => {
if(result.statusCode === 200 ){
this.getAttributeDatalist()
}
    })

    }
    getAttributeDatalist(){
        let req= {
            objname : this.attributeID,
            flag  : 'EditBusinessObjectFromMaster'
        }
        this.caseService.postData('Getbuisnessobject',req).subscribe(result => {
        this.TheChosenchoiceEditList = result.data
        console.log('this.TheChosenchoiceEditList',this.TheChosenchoiceEditList);
        
        })
    }
  
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscriptionRoleModule?.unsubscribe();
      }
}
