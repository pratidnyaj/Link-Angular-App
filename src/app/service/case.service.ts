import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter, Output, } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private baseUrl: string;

  constructor(private httpclient: HttpClient, private appService: AppService) {
    this.baseUrl = appService.getBaseUrl();
  }

  @Output() loadCaselistpage: EventEmitter<Object> = new EventEmitter()
  @Output() loadcaseListFilter: EventEmitter<Object> = new EventEmitter()
  @Output() selectCaseFilterName: EventEmitter<Object> = new EventEmitter();
  @Output() popupModalActive: EventEmitter<Object> = new EventEmitter();
  @Output() ContactPopupModalActive: EventEmitter<Object> = new EventEmitter();
  @Output() modalInactive: EventEmitter<Object> = new EventEmitter();
  @Output() previewCaseID: EventEmitter<Object> = new EventEmitter();
  @Output() pushNotificationModal : EventEmitter<Object> = new EventEmitter();
  @Output() mergeModal : EventEmitter<Object> = new EventEmitter();
  @Output() roleBaseAccessModules : EventEmitter<Object> = new EventEmitter();
  @Output() timerModalPopup : EventEmitter <Object> = new EventEmitter();
  //#region Subscriptions
  //_previewData the Case ID
  private _previewData: Subject<any> = new Subject<any>(); //use proper type instead of any
  previewData$: Observable<any> = this._previewData.asObservable(); //same here
  //This Subject Observer will listen inside case-list component.
  private _caseIdSource = new BehaviorSubject('');
  _syncCaseId = this._caseIdSource.asObservable();

  private roleBaseAccessModulesTwo = new BehaviorSubject('');
  _roleBaseAccessModulesTwo = this.roleBaseAccessModulesTwo.asObservable();

  
  private editcustomFieldData = new BehaviorSubject('');
  _editcustomFieldData = this.editcustomFieldData.asObservable();


private loadClientListFilter = new  BehaviorSubject('');
_loadClientListFilter = this.loadClientListFilter.asObservable();

  private timerModalPopupNext = new BehaviorSubject('');
  _timerModalPopupNext = this.timerModalPopupNext.asObservable();

  

  syncCaseId(message: string) {
    this._caseIdSource.next(message)
  }

  //This Subject is used to emit changes on case-list selection.
  //Subscribers :: case-info, case-interaction-list 
  private _caseSubjectSource = new Subject<any>();
  observeCaseData(): Observable<any> {
    return this._caseSubjectSource.asObservable();
  }
  emitCaseData(oCase: any) {
    this._caseSubjectSource.next(oCase);
  }
  //This Subject is used to emit changes on dropdown 
  //Subscribers :: case-list-interaction 
  private _disp_subdisp_subsubdisp_source = new Subject<any>();
  observeDrpData(): Observable<any> {
    return this._disp_subdisp_subsubdisp_source.asObservable();
  }
  emitDrowpdownSelectedData(oDrp: any) {
    this._disp_subdisp_subsubdisp_source.next(oDrp);
  }

  //#endregion

  public assignCaseToMe(strCaseId: string, strUserId: string): Observable<any> {
    const url = `${this.baseUrl}/AssignCaseToSelf?Action=PickUpCase&caseid=${strCaseId}&UserID=${strUserId}`;
    return this.httpclient.get(url);
    }
  
    //  public assignCase(strCaseId: string, strUserId: string,strTeamId:string,strAgentId:string): Observable<any> {
    //     const url = `${this.baseUrl}/AssignCaseToAgent?Action=AssignCase&caseid=${strCaseId}&UserID=${strUserId}&teamId=${strTeamId}&agentId=${strAgentId}`;
    //     return this.httpclient.get(url);
    //   }

      public getPastCaseList(): Observable<any> {
        return this.httpclient.get('./assets/json/past-case.json');
      }
      public mergecase(mergecaseId: string,parentcaseId:string,userId:string): Observable<any> {
        const url = `${this.baseUrl}/Merge?Action=Merge&mergecaseid=${mergecaseId}&parentcaseid=${parentcaseId}&UserID=${userId}`;
        return this.httpclient.get<any>(url);
      }
    
      //Code reusablity
      postData(urlPrefix: string, query:any): Observable<any> {
        const url = `${this.baseUrl}/${urlPrefix}`;
        return this.httpclient.post<any>(url, query)
        }

        postDataCase(urlPrefix: string,query : any): Observable<any> {
          // console.log('frmData======>',query);
          const url = `${this.baseUrl}/${urlPrefix}`;
          // return this.httpclient.post<any>('http://localhost:8082/case/saveNewCase',query)
         return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/case/saveNewCase',query)  
        }

     
        postDataUpload(urlPrefix: string,query : any): Observable<any> {
          const url = `${this.baseUrl}/${urlPrefix}`;
          return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/case/uploadInterfile',query)
           // return this.httpclient.post<any>('http://localhost:8082/case/uploadInterfile',query)
          //     // return this.httpclient.post<any>(`http://localhost:8082/case/uploadInterfile/userID=${strContactId}`,query)
        //  return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/case/uploadInterfile',query)  
        }



  // public markCaseAsBlock(blockRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/MarkBlock`;
  //   return this.httpclient.post<any>(url, blockRq);
  // }

  // public markCaseAsSpam(spamRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/MarkSpam`;
  //   return this.httpclient.post<any>(url, spamRq);
  // }

  // public CaseClose(closeRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/closeCase`;
  //   return this.httpclient.post<any>(url, closeRq);
  // }
 

  // public createInteraction(interactionRq: any): Observable<any> {
  //   const url = `${this.baseUrl}`;
  //   return this.httpclient.post<any>(url, interactionRq);
  // }

  // public getMailBoxInfo(mailBoxRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/mailBox`;
  //   return this.httpclient.post<any>(url, mailBoxRq);
  // }

  // public getCaseInteractionHistory(caseInteractionHistoryRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/caseHistory`;
  //   return this.httpclient.post<any>(url, caseInteractionHistoryRq);
  //   //return this.httpclient.get('./assets/json/interaction-history-list.json');
  // }

  // public getCaseList(caseListRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/fetchcaseApi`;
  //   //return this.httpclient.get('./assets/json/cases-list.json');
  //   return this.httpclient.post<any>(url, caseListRq);
  // }

//   public getCaseInfo(caseInfoRq: any): Observable<any> {
//     const url = `${this.baseUrl}/caseinfoApi`;
// console.log(`${this.baseUrl}/caseinfoApi`,caseInfoRq)

//     //return this.httpclient.get('./assets/json/case-details.json');
//     return this.httpclient.post<any>(url, caseInfoRq);
//   }

  // public getContactInfo(contactInfoRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/contactinfoApi`;
  //   return this.httpclient.post<any>(url, contactInfoRq);
  // }

 
  // public getDisposition(dispositionRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/Getdisposition`;
  //   return this.httpclient.post<any>(url, dispositionRq);
  // }


  // public getSubdisposition(subdispositionRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/Getsubdisposition`;
  //   return this.httpclient.post<any>(url, subdispositionRq);
  // }
  
  // public getSubsubdisposition(subsubdispositionRq: any): Observable<any> {
  //   const url = `${this.baseUrl}/Getsubsubdisposition`;
  //   return this.httpclient.post<any>(url, subsubdispositionRq);
  // }
  

  caselistReload() {
    this.loadCaselistpage.emit()
  }
  modalcloseInactive(){
    this.modalInactive.emit()
  }
  caseListFilterReload( value : any){
    this.loadcaseListFilter.emit(value)
  }
  clientListFilterReload( value : any){
    // this.loadClientListFilter.emit(value)
    this.loadClientListFilter.next(value);
  }
  selectFilterDefault(value : any){
    this.selectCaseFilterName.emit(value)
  }
  //Case and contact PopUp Modal
  casepopupModal(value: any) {
    if ('casemodalOne' === value) {
      this.popupModalActive.emit(value)
    }
    else if ('contactModal' === value) {
      this.ContactPopupModalActive.emit(value)
    }
    else if('pushNotificationModal' === value){
      this.pushNotificationModal.emit(value)
    }
    // else if('timerModalPopup' === value){
    //   this.timerModalPopup.emit(true)
    // }
    // else if('timerModalPopupClose' === value){
    //   this.timerModalPopup.emit(false)
    // }
    // else if('mergeModal'=== value){
    //   this.mergeModal.emit(value)
    // }
  }
  timerpopupModal(value: any) {
if(value.type){
this.timerModalPopup.emit(value)
// this.timerModalPopupNext.next(value)
}else{
  this.timerModalPopup.emit(value)
  // this.timerModalPopupNext.next(value)
}
  }

  emitCaseId(caseID: any) {
    this.previewCaseID.emit(caseID)
    // this._previewData.next(caseID);
  }
//
emitCustomField(editcustomId){
  // this.editcustomFieldData.emit(editcustomId);
  this.editcustomFieldData.next(editcustomId);

}
  //Role base access

  roleBaseAccessModule( value : any){
    this.roleBaseAccessModules.emit(value)
    this.roleBaseAccessModulesTwo.next(value);
  }

}