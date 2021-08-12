import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-list-display',
  templateUrl: './case-list-display.component.html',
  styleUrls: ['./case-list-display.component.scss']
})
export class CaseListDisplayComponent implements OnInit {

  constructor(private caseService: CaseService) { }

  @Input() case: any = {};
  @Output() currentSelectedCaseIdChanged: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
  }

  selectCase(oCase: any) {    
     //Emits the changes back to case-list (parent) component
    this.currentSelectedCaseIdChanged.emit(oCase.caseid);
    
    this.caseService.requestCaseInfo(oCase);
  } 
}