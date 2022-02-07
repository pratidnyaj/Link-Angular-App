import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { CaseService } from 'src/app/service/case.service';
import { FilterCasesPipe } from 'src/app/shared/pipes/filter-cases.pipe';

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.scss']
})
export class CaseListComponent implements OnInit {

  constructor(private caseService: CaseService, private app: AppService) { }

  //Holds list of cases
  cases: any[] = [];
  //captures the currently selected case from the case list which is used to apply the active class.
  currentSelectedCaseId: string = "";
  isCaseListBlur: boolean = false;

  //This Subscription will trigger changes to dependent components.
  //Mimics clicking of case from case list.
  _syncCaseId: string = "";
  syncSubscription: Subscription | undefined;
  subscription: Subscription | undefined;
  subscriptionCase : Subscription | undefined;
  selectcaseName: any;
  closeCaseReload : boolean = false;
  ngOnInit(): void {
    this.reloadcaseList();
    this.loadcaseListFilterData();
    this.getsyncCaseId();
  }

  getsyncCaseId() {
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
    this.selectcaseName = oCase;
    this.caseService.emitCaseData(oCase);
    this.currentSelectedCaseId = oCase.caseid;
  }
  selectedFilterName: any;
  fetchCaseWithFilter(filterData: any) {
    //From parent (case-list) we have captured data. 
    //console.log('fetchCaseWithFilter', filterData);
    this.selectedFilterName = filterData.selectedCaseOption
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
      this.caseService.postData('fetchcaseApi', caseListRq)
        // this.caseService.getCaseList(caseListRq)
        .subscribe(
          data => {
            console.log(data);
            if(data.data !=null ){
              console.log('data hace')
            
            if (data.data.length > 0) {
              this.cases = data.data;
              if (this.selectcaseName != undefined && this.closeCaseReload != true) {
                this.selectCase(this.selectcaseName);
              } else {
                this.selectcaseName = undefined;
                this.caseService.emitCaseData(data.data[0]);
                this.currentSelectedCaseId = data.data[0].caseid;
              }
            }
          }else{
            console.log('no data');
            this.cases = [];
            this.selectCase('null');
            this.caseService.emitCaseData(data);
            this.currentSelectedCaseId = data;
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
  
  reloadcaseList() {
    console.log('smaple case list ')
    this.subscription = this.caseService.loadCaselistpage.subscribe(() => {
      let filterData = { selectedCaseOption: this.selectedFilterName, searchText: '' }
      console.log(filterData)
      this.fetchCaseWithFilter(filterData);
    })
  }
  //
  loadcaseListFilterData(){
    this.subscriptionCase = this.caseService.loadcaseListFilter.subscribe((data) => {
     if(data === 'caseSelectFirstOne'){
     this.selectcaseName = undefined;
    }else if(data === 'CaseCreated'){
      this.selectcaseName = undefined;
      let filterData = { selectedCaseOption: 'AllManualCases', searchText: '' }
      this.fetchCaseWithFilter(filterData);
      this.caseService.selectFilterDefault('AllManualCases');
    }else if(data === 'closeCase'){
      this.closeCaseReload = true;
      let filterData = { selectedCaseOption: this.selectedFilterName, searchText: '' }
      this.fetchCaseWithFilter(filterData);
    }
    })
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.syncSubscription?.unsubscribe();
    this.subscription?.unsubscribe();
    this.subscriptionCase?.unsubscribe();
  }
}