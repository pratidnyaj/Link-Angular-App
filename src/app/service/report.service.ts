import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,of } from 'rxjs';
import { AppService } from '../app.service';
import { delay, map } from 'rxjs/operators';


export interface TeamData {
    TeamID: string;
    TeamName: boolean;
} 
@Injectable({
    providedIn: 'root'
})

export class ReportService {
 //This Subject is used to emit changes on Report selection.
  //Subscribers :: Case-level-report
  private _reportSubjectSource = new Subject<any>();
  observeReportData(): Observable<any> {
    return this._reportSubjectSource.asObservable();
  }
  emitReportData(oReport: any) {
    this._reportSubjectSource.next(oReport);
  }
  //#endregion

    private baseUrl: string;

    constructor(private httpclient: HttpClient, private appService: AppService) {
        this.baseUrl = appService.getBaseUrl();
    }

   //Code reusablity
    postData(urlPrefix: string, query:any): Observable<any> {
    const url = `${this.baseUrl}/${urlPrefix}`;
    return this.httpclient.post<any>(url, query)
    }

    // public getCaseLevelReport(ReqPara: any): Observable<any> {
    //     const url = `${this.baseUrl}/CaseDetailReport`;
    //     return this.httpclient.post<any>(url, ReqPara);
    // }

    // public getInteractionReport(ReqPara: any): Observable<any> {
    //     const url = `${this.baseUrl}/InteractionReport`;
    //     return this.httpclient.post<any>(url, ReqPara);
    // }
    
    // public getAgentPerformanceReport(ReqPara: any): Observable<any> {
    //     const url = `${this.baseUrl}/AgentPerformanceReport`;
    //     return this.httpclient.post<any>(url, ReqPara);
    // }
    
    // public getTeamsData(ReqPara: any): Observable<any> {
    //     const url = `${this.baseUrl}/GetTeamsData`;
        
    //   return this.httpclient.post<any>(url, ReqPara);
    //     // if (ReqPara) {
    //     //     items = items.filter(x => x.name.toLocaleLowerCase().indexOf(ReqPara.toLocaleLowerCase()) > -1);
    //     // }
    //     // return of(items).pipe(delay(500));
      
    // }
    
//     public getAgentsData(ReqPara: any): Observable<any> {
//         const url = `${this.baseUrl}/GetAgentsData`;
//         return this.httpclient.post<any>(url, ReqPara);
//     }
    
//     public getChannelData(ReqPara: any): Observable<any> {
//         const url = `${this.baseUrl}/GetChannelData`;
//         return this.httpclient.post<any>(url, ReqPara);
//     }
}