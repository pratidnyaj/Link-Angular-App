import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private httpclient: HttpClient) { }

  //#region start
  private _caseSubjectSource = new Subject<any>();  
  observeCaseData(): Observable<any> {
    return this._caseSubjectSource.asObservable();
  }
  emitCaseData(oCase: any) {
    this._caseSubjectSource.next(oCase);
  }
  //#endregion

  public getMailBoxInfo(mailBoxRq: any): Observable<any> {
    return this.httpclient.post<any>("http://localhost:8005/api/mailBox", mailBoxRq);
  }

  public getCaseInteractionHistory(caseInteractionHistoryRq: any): Observable<any> {
    return this.httpclient.post<any>("http://localhost:8005/api/caseHistory1", caseInteractionHistoryRq);
    //return this.httpclient.get('./assets/json/interaction-history-list.json');
  }

  public getCaseList(caseListRq: any): Observable<any> {
    //return this.httpclient.get('./assets/json/cases-list.json');
    return this.httpclient.post<any>("http://localhost:8005/api/fetchcaseApi", caseListRq);
  }

  public getCaseInfo(caseInfoRq: any): Observable<any> {
    //return this.httpclient.get('./assets/json/case-details.json');
    return this.httpclient.post<any>("http://localhost:8005/api/caseinfoApi", caseInfoRq);
  }

  public getContactInfo(contactInfoRq: any): Observable<any> {
    return this.httpclient.post<any>("http://localhost:8005/api/contactinfoApi", contactInfoRq);
  }

  public getPastCaseList(): Observable<any> {
    return this.httpclient.get('./assets/json/past-case.json');
  }
}