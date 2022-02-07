import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-knowledge-manager-details',
  templateUrl: './knowledge-manager-details.component.html',
  styleUrls: ['./knowledge-manager-details.component.scss']
})
export class KnowledgeManagerDetailsComponent implements OnInit {
  @Output() closeKnowledgeManagerDetails: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }
  closePanel(){    
    this.closeKnowledgeManagerDetails.emit(true);
  }
}
