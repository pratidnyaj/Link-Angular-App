import { Component, Input, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-list-display',
  templateUrl: './case-list-display.component.html',
  styleUrls: ['./case-list-display.component.scss']
})
export class CaseListDisplayComponent implements OnInit {

  constructor(private caseService : CaseService) { }

  @Input() case : any = {};

  ngOnInit(): void {
  }

  selectCase(oCase:any)
  {    
    this.caseService.requestCaseInfo(oCase);
  }
}