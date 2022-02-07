import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/service/client.service';
import { ExcelService } from 'src/app/service/excel.service';

@Component({
  selector: 'app-client-cases',
  templateUrl: './client-cases.component.html',
  styleUrls: ['./client-cases.component.scss']
})
export class ClientCasesComponent implements OnInit {
  CaselevelData: any[] = [];
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 10;
  absoluteIndex: number = 0;
  subscription: Subscription | undefined;


  constructor(private ClientService: ClientService, private excelservice: ExcelService) {

    this.CaselevelData = new Array<any>();
  }
  handlePageChange(event: number) {
    this.currentPageNumber = event; 
    this.absoluteIndex = this.perPageCnt * (this.currentPageNumber);
let Reqparameter =
{
  "ContactId": this.msgID,//"P7Y6LE",
  "Flag": "ViewCase",
  "PageNumber":this.currentPageNumber,
  "Limit":'10'
}
this.ClientService.postData('getCaseForContact',Reqparameter).subscribe(result => {
  if (result.data) {
    this.CaselevelData = result.data.data;
    this.totalRec = result.data.totalRecord;
    console.log('getClientCaseData', this.CaselevelData);
  }
  else {
    this.CaselevelData = [];
    this.totalRec = 0;
  }
})

  }



  ngOnInit(): void {
    this.getClientDetails();
  }
  title = 'angular-app';
  fileName = 'CaseLevelReport.xlsx';

  exportexcel(): void {
    this.excelservice.exportAsExcelFile(this.CaselevelData, 'caselevel_data');
  }

  msgID : any;
  getClientDetails() {
    this.subscription = this.ClientService.observeContactData().subscribe(message => {
    this.msgID =   message.ContactID;
      let Reqparameter =
      {
        "ContactId":  message.ContactID, //"P7Y6LE",
        "Flag": "ViewCase",
        "PageNumber": "1",
        "Limit": "10"
      }
      //this is node.js code this.ClientService.postDataNode('client/getCaseContactList', Reqparameter).subscribe(data => {
      this.ClientService.postData('getCaseForContact',Reqparameter).subscribe(result => {
        if (result.data) {
          this.CaselevelData = result.data.data;
          this.totalRec = result.data.totalRecord;
          console.log('getClientCaseData', this.CaselevelData);
        }
        else {
          this.CaselevelData = [];
          this.totalRec = 0;
        }
      })
    });

  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
