import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private httpclient: HttpClient) { }

  private _caseInfoSource = new Subject<any>();
  caseInfo$ = this._caseInfoSource.asObservable();

  requestCaseInfo(oCase:any)
  {
    this._caseInfoSource.next(oCase);
  }

  public getCaseInteractionHistory(): Observable<any> {
    return this.httpclient.get('./assets/json/interaction-history-list.json');
  }

  public getCaseList(): Observable<any> {
    return this.httpclient.get('./assets/json/cases-list.json');
  }

  public getCaseInfo(): Observable<any> {
    return this.httpclient.get('./assets/json/case-details.json');
  }
}