import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  //This Subject Observer will listen inside case-list component.
  private _caseIdSource = new BehaviorSubject('');
  _syncCaseId = this._caseIdSource.asObservable();
  
  syncCaseId(message: string) {
    this._caseIdSource.next(message)
  }

  //#region start
  //This Subject is used to emit changes on case-list selection.
  //Subscribers :: case-info, case-interaction-list 
  private _caseSubjectSource = new Subject<any>();
  observeCaseData(): Observable<any> {
    return this._caseSubjectSource.asObservable();
  }
  emitCaseData(oCase: any) {
    this._caseSubjectSource.next(oCase);
  }
  //#endregion

  public assignCaseToMe(strCaseId: string, strUserId: string): Observable<any> {   
    const url = `${this.baseUrl}/AssignCaseToSelf?Action=PickUpCase&caseid=${strCaseId}&UserID=${strUserId}`;
    return this.httpclient.get(url);
  }

  public createInteraction(interactionRq: any): Observable<any> {
    const url = `${this.baseUrl}/sendMail`;
    return this.httpclient.post<any>(url, interactionRq);
  }

  public getMailBoxInfo(mailBoxRq: any): Observable<any> {
    const url = `${this.baseUrl}/mailBox`;
    return this.httpclient.post<any>(url, mailBoxRq);
  }

  public getCaseInteractionHistory(caseInteractionHistoryRq: any): Observable<any> {
    const url = `${this.baseUrl}/caseHistory1`;
    return this.httpclient.post<any>(url, caseInteractionHistoryRq);
    //return this.httpclient.get('./assets/json/interaction-history-list.json');
  }

  public getCaseList(caseListRq: any): Observable<any> {
    const url = `${this.baseUrl}/fetchcaseApi`;
    //return this.httpclient.get('./assets/json/cases-list.json');
    return this.httpclient.post<any>(url, caseListRq);
  }

  public getCaseInfo(caseInfoRq: any): Observable<any> {
    const url = `${this.baseUrl}/caseinfoApi`;
    //return this.httpclient.get('./assets/json/case-details.json');
    return this.httpclient.post<any>(url, caseInfoRq);
  }

  public getContactInfo(contactInfoRq: any): Observable<any> {
    const url = `${this.baseUrl}/contactinfoApi`;
    return this.httpclient.post<any>(url, contactInfoRq);
  }

  public getPastCaseList(): Observable<any> {
    return this.httpclient.get('./assets/json/past-case.json');
  }
}