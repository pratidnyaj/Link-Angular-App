import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';
import { FilterCasesPipe } from 'src/app/shared/pipes/filter-cases.pipe';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  constructor(private caseService: CaseService) { }

  cases: any[] = [];

  ngOnInit(): void {

  }

  fetchCaseWithFilter(filterData: any) {
    //From parent (case-list) we have captured data. 
    console.log('fetchCaseWithFilter', filterData);

    if (filterData.searchText) {
      //search is via textbox
      const searchCasePipe = new FilterCasesPipe();
      const filteredCases = searchCasePipe.transform(this.cases, filterData.searchText);
      this.cases = filteredCases as any[];
      //console.log('filteredCases', filteredCases);
    }
    else if (filterData.selectedCaseOption) {
      console.log('server hit...')
      this.caseService.getCaseList().subscribe(data => {
        this.cases = data.data;
      })
    }
    else {

    }


  }

}
