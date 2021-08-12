import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-case-filter',
  templateUrl: './case-filter.component.html',
  styleUrls: ['./case-filter.component.scss']
})
export class CaseFilterComponent implements OnInit {

  constructor() { }
  @Output() caseFilterEvent = new EventEmitter();

  arrCasesOption = new Array();
  selectedCaseOption: any = "MyOpenCases";
  IsToggleSearchBoxOpen: boolean = false;
  searchText: any = "";

  ngOnInit(): void {
    this.setCasesOption();
    this.goToCaseList(this.selectedCaseOption);
  }

  emitCaseFilterChanges()
  {
    this.caseFilterEvent.emit({ 'selectedCaseOption': this.selectedCaseOption, "searchText": this.searchText });
  }

  goToCaseList(selectedCaseOptionValue: any) {
    //We pass the data from child (case-filter) to parent (case-list)
    this.selectedCaseOption = selectedCaseOptionValue;
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
    this.arrCasesOption.push({ "key": "MyOpenCases", "value": "My Open Cases" });
    this.arrCasesOption.push({ "key": "MyClosedCases", "value": "My Closed Cases" });
    this.arrCasesOption.push({ "key": "MyFreshCases", "value": "My Fresh Cases" });

    this.arrCasesOption.push({ "key": "AllOpenCases", "value": "All Open Cases" });
    this.arrCasesOption.push({ "key": "AllClosedCases", "value": "All Closed Cases" });
    this.arrCasesOption.push({ "key": "AllInProgressCases", "value": "All In-Progress Cases" });
    this.arrCasesOption.push({ "key": "AllNotRespondedCases", "value": "All Not-Responded Cases" });
    this.arrCasesOption.push({ "key": "AllFreshCases", "value": "All Fresh Cases" });
  }

}