import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
import { FilterCasesPipe } from 'src/app/shared/pipes/filter-cases.pipe';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  constructor(private caseService: CaseService) { }

  //Holds list of cases
  cases: any[] = [];
  //captures the currently selected case from the case list which is used to apply the active class.
  currentSelectedCaseId: string = "";
  isCaseListBlur: boolean = false;

  //This Subscription will trigger changes to dependent components.
  //Mimics clicking of case from case list.
  _syncCaseId: string = "";
  syncSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.syncSubscription = this.caseService._syncCaseId
      .subscribe(strCaseId => {
        if (strCaseId && this.cases.length > 0) {
          this._syncCaseId = strCaseId;

          var oFilteredCase = this.cases.filter(function (el) {
            return el.caseid == strCaseId              
          });          
          this.selectCase(oFilteredCase[0]);          
        }
      });
  }

  selectCase(oCase: any) {
    //trigger selected case object details of all the subscribers.
    this.caseService.emitCaseData(oCase);
    this.currentSelectedCaseId = oCase.caseid;    
  }

  fetchCaseWithFilter(filterData: any) {
    //From parent (case-list) we have captured data. 
    //console.log('fetchCaseWithFilter', filterData);

    if (filterData.searchText) {
      //search is via textbox.
      const searchCasePipe = new FilterCasesPipe();
      const filteredCases = searchCasePipe.transform(this.cases, filterData.searchText);
      this.cases = filteredCases as any[];
      //console.log('filteredCases', filteredCases);
    }
    else if (filterData.selectedCaseOption) {
      //console.log('server hit...');
      this.isCaseListBlur = true;

      let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";

      let caseListRq: any = {
        "userID": JSON.parse(oLoggedInUser).UserID,
        "caseOption": filterData.selectedCaseOption,
        "limitRecord": ""
      };

      this.caseService.getCaseList(caseListRq)
        .subscribe(
          data => {
            if (data.data.length > 0) {
              this.cases = data.data;
              this.selectCase(data.data[0]);
            }
          }, error => console.log('getCaseList', error?.message))
        .add(() => {
          this.isCaseListBlur = false;
        });
    }
    else {
      //TODO : No match.
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.syncSubscription?.unsubscribe();
  }
}