import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-client-filter',
  templateUrl: './client-filter.component.html',
  styleUrls: ['./client-filter.component.scss']
})
export class ClientFilterComponent implements OnInit {
  @Input() collaborateFilter: string | undefined;
  @Output() clientFilterEvent = new EventEmitter();

  searchShow: boolean = false;
  selectedClientOption: any;
  arrClientOption = new Array();

  constructor(private caseService : CaseService) { }
  
  ngOnInit(): void {
    this.setClientOption();
    this.goToCaseList(this.selectedClientOption);
    this.roleBasedAccess();
  }

  setCasesOption() {
    throw new Error('Method not implemented.');
  }

  toggleSearch() {
    this.searchShow = !this.searchShow;

  }
  
  goToCaseList(selectedClientOptionValue: any) {
    //We pass the data from child (case-filter) to parent (case-list)
    this.selectedClientOption = selectedClientOptionValue;
    //this.emitCaseFilterChanges();
  }
  emitCaseFilterChanges() {
    throw new Error('Method not implemented.');
  }
  setClientOption() {
    this.arrClientOption = [
      { "key": "Agent", "value": "Agent" },
      { "key": "Customer", "value": "Customer" },
      { "key": "Teams", "value": "Teams" },
      { "key": "Agent", "value": "Agent" },
      { "key": "Customer", "value": "Customer" },
      { "key": "Teams", "value": "Teams" },

    ]
  }








  //Role base access permission Module
  roleBasedAccessModule: any = [];
  subscriptionRoleModule: Subscription | undefined;
  clientMenuAccessModule: any;
  clientSearchbarAccessModule: any;
  roleBasedAccess() {
    this.subscriptionRoleModule = this.caseService._roleBaseAccessModulesTwo.subscribe((result) => {
      this.roleBasedAccessModule = result;
      [...this.roleBasedAccessModule].map(item => {
        if (item.FeatureName === 'Client_Menu') { this.clientMenuAccessModule = item.FeatureStatus; }
        else if (item.FeatureName === 'Client_Search') { this.clientSearchbarAccessModule = item.FeatureStatus;}
      });
    })
  }
  //End Access permission 
  ngOnDestroy() {
    this.subscriptionRoleModule?.unsubscribe();
  }






}
