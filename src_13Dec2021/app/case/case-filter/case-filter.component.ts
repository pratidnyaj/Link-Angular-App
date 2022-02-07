import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-filter',
  templateUrl: './case-filter.component.html',
  styleUrls: ['./case-filter.component.scss']
})
export class CaseFilterComponent implements OnInit {
  @Input() collaborateFilter: string | undefined;

  filterShow: boolean = false;
  searchShow: boolean = false;
  sortShow: boolean = false;

  constructor(private caseService: CaseService) { }
  @Output() caseFilterEvent = new EventEmitter();

  arrCasesOption = new Array();
  selectedCaseOption: any = "AllOpenCases";
  IsToggleSearchBoxOpen: boolean = false;
  searchText: any = "";

  ngOnInit(): void {
    this.loadFilterName();
    this.setCasesOption();
    this.goToCaseList(this.selectedCaseOption);
    this.roleBasedAccess();
  }
  toggleFilter() {
    this.filterShow = !this.filterShow;
    this.searchShow = false;
    this.sortShow = false;
  }
  toggleSearch() {
    this.searchShow = !this.searchShow;
    this.filterShow = false;
    this.sortShow = false;
  }
  toggleSort() {
    this.sortShow = !this.sortShow;
    this.filterShow = false;
    this.searchShow = false;
  }

  emitCaseFilterChanges() {
    this.caseFilterEvent.emit({ 'selectedCaseOption': this.selectedCaseOption, "searchText": this.searchText });
  }

  goToCaseList(selectedCaseOptionValue: any) {
    //We pass the data from child (case-filter) to parent (case-list)
    this.selectedCaseOption = selectedCaseOptionValue;
    this.caseService.caseListFilterReload('caseSelectFirstOne');
    this.emitCaseFilterChanges();
  }

  toggleSearchBox() {
    this.IsToggleSearchBoxOpen = !this.IsToggleSearchBoxOpen;
  }

  onCaseSearch(event: any) {
    //This gets trigerred on every keyup event.
    this.emitCaseFilterChanges();
  }

  setCasesOption() {
    this.arrCasesOption = [
      { "key": "MyOpenCases", "value": "My Open Cases" },
      { "key": "MyClosedCases", "value": "My Closed Cases" },
      { "key": "AllOpenCases", "value": "All Open Cases" },
      { "key": "AllClosedCases", "value": "All Closed Cases" },
      { "key": "AllNotRespondedCases", "value": "All Not-Responded Cases" },
      { "key": "AllFreshCases", "value": "All Fresh Cases" },
      { "key": "AllManualCases", "value": "All Manual Cases" }
    ]
  }
  subscriptionFilterName: Subscription | undefined;
  loadFilterName() {
    this.subscriptionFilterName = this.caseService.selectCaseFilterName.subscribe((data) => {
      console.log(data)
      this.selectedCaseOption = data;


    })
  }









  //Role base access permission Module
  roleBasedAccessModule : any = [];
  subscriptionRoleModule: Subscription | undefined;
  searchCaseAccessModule : any;
  sortCaseAccessModule : any;
  caseFilterAccessModule : any;
  roleBasedAccess(){
  this.subscriptionRoleModule = this.caseService.roleBaseAccessModules.subscribe((result) => {
    this.roleBasedAccessModule = result;
 [...this.roleBasedAccessModule].map(item => { 
   if(item.FeatureName === 'CASE_SearchCase'){this.searchCaseAccessModule = item.FeatureStatus; }
   else if(item.FeatureName === 'CASE_Sort'){this.sortCaseAccessModule = item.FeatureStatus; }
   else if(item.FeatureName === 'CASE_Filter'){this.caseFilterAccessModule = item.FeatureStatus;}
 });
  })
}
//End Access permission 
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionFilterName?.unsubscribe();
    this.subscriptionRoleModule?.unsubscribe();
  }

}