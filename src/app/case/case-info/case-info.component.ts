import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-info',
  templateUrl: './case-info.component.html',
  styleUrls: ['./case-info.component.scss']
})
export class CaseInfoComponent implements OnInit {

  constructor(private caseService: CaseService) { }

  caseInfo: any = {};
  selectedCaseId: string = "";

  ngOnInit(): void {
    this.caseService.caseInfo$.subscribe(message => {
      //console.log('case-info',message);

      let caseInfoRq: any = {
        "caseId": message.caseid
      }

      this.caseService.getCaseInfo(caseInfoRq).subscribe(data => {
        console.log('case-info', data);
        if (data.status) {
          this.caseInfo = data.data[0];
          this.selectedCaseId = message.caseid;          
        }
        // console.log(data);
      })

    })
  }

}