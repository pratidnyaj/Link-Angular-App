import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-block-case',
  templateUrl: './block-case.component.html',
  styleUrls: ['./block-case.component.scss']
})
export class BlockCaseComponent implements OnInit {
  @Output() closeBlock: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }
  closePanel(){
    this.closeBlock.emit(false)
  }

}
