import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  constructor(private caseService : CaseService) { }

  cases: any[] = [];

  ngOnInit(): void {    
    
  }

  fetchCaseWithFilter()
  {
    this.caseService.getCaseList().subscribe(data=>
      {        
        this.cases = data.data;
      })
  }

}
