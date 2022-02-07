import { HttpClient } from '@angular/common/http';
import { Injectable, Output,EventEmitter } from '@angular/core';
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


  private getclientID = new BehaviorSubject('');
  _getclientID = this.getclientID.asObservable();


  
  // @Output() getclientID: EventEmitter<Object> = new EventEmitter();

  syncContactId(message: string) {
    this._contactIdSource.next(message)
  }


  emitClientId(clientID: string) {
    // this.getclientID.emit(clientID)
    this.getclientID.next(clientID);
  }

  //This Subject is used to emit changes on contact-list selection.
  //Subscribers :: Client-info, client-case 
  public  _contactSubjectSource = new Subject<any>();


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

  postDataClient(urlPrefix: string,query : any): Observable<any> {
    const url = `${this.baseUrl}/${urlPrefix}`;
    return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/client/saveNewContact',query)
   // return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/case/saveNewCase',query)  
  }


  postDataAgent(urlPrefix: string,query : any): Observable<any> {
    const url = `${this.baseUrl}/${urlPrefix}`;
    //  return this.httpclient.post<any>('http://localhost:8082/agent/newAgent',query)
    return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/agent/newAgent',query)
  
  }


  postDataAccount(urlPrefix: string,query : any): Observable<any> {
    const url = `${this.baseUrl}/${urlPrefix}`;
    //  return this.httpclient.post<any>('http://localhost:8082/client/newAccount',query)
    return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/client/newAccount',query)
  
  }

  postDataCollaborator(urlPrefix: string,query : any): Observable<any> {
    const url = `${this.baseUrl}/${urlPrefix}`;
    //  return this.httpclient.post<any>('http://localhost:8082/collaborator/newCollaborator',query)
    return this.httpclient.post<any>('https://unfyduat.unfyd.com/Link_Node_API_Phase1/collaborator/newCollaborator',query)
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