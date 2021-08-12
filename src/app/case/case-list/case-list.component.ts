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
  //captures the currently selected case from the case list which is used to apply the active class.
  currentSelectedCaseId: string = "";

  ngOnInit(): void {

  }

  oncurrentSelectedCaseIdChanged(selectedCaseId: any)
  {
    this.currentSelectedCaseId = selectedCaseId;
  }

  fetchCaseWithFilter(filterData: any) {
    //From parent (case-list) we have captured data. 
    console.log('fetchCaseWithFilter', filterData);

    if (filterData.searchText) {
      //search is via textbox.
      const searchCasePipe = new FilterCasesPipe();
      const filteredCases = searchCasePipe.transform(this.cases, filterData.searchText);
      this.cases = filteredCases as any[];
      //console.log('filteredCases', filteredCases);
    }
    else if (filterData.selectedCaseOption) {
      console.log('server hit...');

      let caseListRq: any = {
        "userID": "Z69EVN",
        "caseOption": "",
        "limitRecord": ""
      };

      this.caseService.getCaseList(caseListRq).subscribe(data => {
        if(data.data.length > 0)
        {
          this.cases = data.data;
          this.currentSelectedCaseId = data.data[0].caseid;
        }        
      })
    }
    else 
    {
      //TODO : No match.
    }
  }

}