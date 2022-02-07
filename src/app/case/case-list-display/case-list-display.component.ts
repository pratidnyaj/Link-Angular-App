import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-list-display',
  templateUrl: './case-list-display.component.html',
  styleUrls: ['./case-list-display.component.scss']
})
export class CaseListDisplayComponent implements OnInit {

  oInxData: any = "";
  @Output() emailEditorEvent = new EventEmitter<any>();

  @ViewChild('divEmailEditorScroll') divEmailEditorScrollEl?:ElementRef;


  @ViewChild('autoSelectEmail',{ static: false}) autoSelectEmailE1?:ElementRef;

//   @ViewChild('autoSelectEmail', {
//     static: false
//  }) autoSelectEmail: ElementRef;
clickedElement: Subscription = new Subscription();
  // @ViewChild('autoSelectEmail', { static: false}) autoSelectEmail : ElementRef;

 
  // clickedElement: Subscription = new Subscription();

  private divEmailEditorScrollRef: any;
  //private autoSelectEmail: any;
  constructor(private caseService: CaseService) { }

  @Input() set setProp(value: any) 
  {
    this.oInxData = value;
    console.log('=====================================================',this.oInxData);
    
    this.selectSourceEmail(this.oInxData.emailSourceAccount)
    this.roleBasedAccess();
  }

  get getInxData(): any {
   // this.selectSourceEmail(this.oInxData.arrFromEmail)
    return this.oInxData;
  }

  ngOnInit(): void {
    console.log('case list display 30===========>');
this.roleBasedAccess();

// setTimeout(() => {
//   this.selectSourceEmail(this.oInxData.arrFromEmail) 
// }, 1000);



  }

  ngAfterViewInit() {
    this.divEmailEditorScrollRef = this.divEmailEditorScrollEl?.nativeElement;
    this.divEmailEditorScrollRef.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  sendMail()
  {
let ccEmailVal = { arrCcEmail : this.ccType}
let reqObject = {...this.oInxData, ...ccEmailVal  }
this.emailEditorEvent.emit({"action":"send","data":reqObject});
  }

  discardMail()
  {
    this.emailEditorEvent.emit({"action":"discard","data":this.oInxData});
  }

  config :any= {
    placeholder: 'Type...',
    tabsize: 2,
    height: '120px',
    uploadImagePath: '/api/upload',
    toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['table']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
//From email Patch to cc
ccType: any = [];
  selectSourceEmail(value: any) {
    console.log(value.SupportEmail);
    console.log(value)
let ccFlag : any;
if(value.SupportEmail !=undefined){
   ccFlag = {
    "flag": "CC",
    "userId": value.SupportEmail
  }
}else if(value != undefined ){
   ccFlag = {
    "flag": "CC",
    "userId": value
  }
}
this.caseService.postData('GetCaseBindDrp', ccFlag).subscribe(data => {
  console.log(data);
  
        var CCids = data.data[0]['CCId'];
        if (CCids !== "" && CCids !== null && CCids !== undefined) {
          var CCidsArr = CCids.split(',');
          this.ccType = CCidsArr;// [data.data[0]['CCId']]
        }
      }) 

  }

  addEmailCC(ccEmail: any) {
    console.log(ccEmail)
    return { ccEmail: ccEmail, tag: true };
  }

  //Role base access permission Module
  roleBasedAccessModule : any = [];
  subscriptionRoleModule: Subscription | undefined;
  addCCInteractionCasesRole  : any;
  roleBasedAccess(){
  this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo
  .subscribe(result => {
   this.roleBasedAccessModule = result;
 [...this.roleBasedAccessModule].map(item => { 
   if(item.FeatureName === 'CASE_AddCC'){
    this.addCCInteractionCasesRole = item.FeatureStatus; 
  }
 });
  });
}
//End Access permission 



  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionRoleModule?.unsubscribe();
    // this.syncSubscription?.unsubscribe();
  }


}