import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-case-filter',
  templateUrl: './case-filter.component.html',
  styleUrls: ['./case-filter.component.scss']
})
export class CaseFilterComponent implements OnInit {

  constructor() { }
  @Output() caseFilterEvent = new EventEmitter();

  ngOnInit(): void {
  }

  callParent() {
    this.caseFilterEvent.emit();
  }

}
