import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string;
  // private baseUrlNode: string;
  constructor(private httpclient: HttpClient, private appService: AppService) {
    this.baseUrl = appService.getBaseUrl();
    // this.baseUrlNode = appService.getBaseUrlNode();
  }

  //#region Subscriptions
  //This Subject Observer will listen inside case-list component.
  private _contactIdSource = new BehaviorSubject('');
  _syncContactId = this._contactIdSource.asObservable();

  syncContactId(message: string) {
    this._contactIdSource.next(message)
  }
  //This Subject is used to emit changes on contact-list selection.
  //Subscribers :: Client-info, client-case 
  private _contactSubjectSource = new Subject<any>();
  observeContactData(): Observable<any> {
    return this._contactSubjectSource.asObservable();
  }
  emitContactData(oContact: any) {
    this._contactSubjectSource.next(oContact);
  }
  //#endregion
  public getClientContactList(): Observable<any> {
    const url = `${this.baseUrl}/fetchClientContacts`;
    return this.httpclient.post<any>(url, {});

  }

  public DeleteContact(strContactId: string): Observable<any> {
    const url = `${this.baseUrl}/DeleteContact?Contactid=${strContactId}`;
    return this.httpclient.get(url);

  }

  //Code reusablity
  postData(urlPrefix: string, query: any): Observable<any> {
    const url = `${this.baseUrl}/${urlPrefix}`;
    console.log(url, query)
    return this.httpclient.post<any>(url, query)
  }



  // public getClientContactInfo(contactInfoRq: any): Observable<any> {
  //     console.log(contactInfoRq);
  //     const url = `${this.baseUrl}/getClientContactInfo`;
  //     return this.httpclient.post<any>(url, contactInfoRq);
  //   }

  // public getClientCaseData(caseInfoRq: any): Observable<any> {
  //   console.log(caseInfoRq);
  //   const url = `${this.baseUrl}/getCaseForContact`;
  //   return this.httpclient.post<any>(url, caseInfoRq);
  // }


  // public CreateContact(contact: any): Observable<any> {
  //     console.log(contact);
  //     const url = `${this.baseUrl}/SaveNewContact`;
  //     return this.httpclient.post<any>(url, contact);
  //   }

  //=====================================Node.js API============================================//

  // postDataNode(urlPrefix: string, query:any): Observable<any> {
  //   const url = `${this.baseUrlNode}/${urlPrefix}`;
  //   console.log(url,query)
  //   return this.httpclient.post<any>(url, query)
  //   }



}