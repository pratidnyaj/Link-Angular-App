import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExcelService } from 'src/app/service/excel.service';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-case-level-report',
  templateUrl: './case-level-report.component.html',
  styleUrls: ['./case-level-report.component.scss']
})
export class CaseLevelReportComponent implements OnInit {
  CaselevelData: any[] = [];
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 5;
  absoluteIndex: number = 0;
  subscription: Subscription | undefined;

  /*
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
  
    public CaseLevelData: any[] = [];
    public InteractionData:any[]=[];
    title = 'datatables';
  */
  constructor(private ReportService: ReportService,private excelservice:ExcelService) {
    this.CaselevelData = new Array<any>();
  }
  handlePageChange(event: number) {
    this.currentPageNumber = event;
    this.absoluteIndex = this.perPageCnt * (this.currentPageNumber - 1);
  }


  ngOnInit(): void {
    
    this.subscription = this.ReportService.observeReportData().subscribe(message => {
      console.log("log data caselevel report search" + message);
      var frdt = message.fromDate;
      var todt = message.toDate;

      //var frdate = frdt.replaceAll("-", "/");
      //var todate = todt.replaceAll("-", "/");
      let Reqparameter =
      {
        "FromDate":frdt, //"08/09/2020",
        "ToDate": todt,//"15/09/2021",
        "Teams": message.teams.join(),//"226,228,232,238,239",  
        "AgentID": message.agents.join(),////"M3V25A1,N5B4J1,X47C6L,2KSCJ4,52VEM6,47CTL3,9SBJ3A,3IAR91,E8RY31,M3V25A,V3IBR9,YI203M,53VFM71,Z69EVN,W36BSK,7C6LEU,5N6Z7Q,RBI304,F0718R,74X5O8,7QXH19,53VFM7,DTM3V2,8E7N4W,Y5LDUN",  
        "CS": message.channel.join()//"UNFYD_LINK"
      }
      this.ReportService.postData('CaseDetailReport',Reqparameter).subscribe(data => {
      // this.ReportService.getCaseLevelReport(Reqparameter).subscribe(data => {
        if (data.data) {
          this.CaselevelData = data.data;
          this.totalRec = data.data.length;
          console.log('CaselevelData', this.CaselevelData);
        }
        else
        {
          this.CaselevelData = [];
          this.totalRec = 0;

        }
      })
    });
    }
    exportexcel(): void
    {
     this.excelservice.exportAsExcelFile(this.CaselevelData, 'CaseLevelReport');
    }
   
}
