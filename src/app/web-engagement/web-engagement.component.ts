import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-web-engagement',
  templateUrl: './web-engagement.component.html',
  styleUrls: ['./web-engagement.component.scss']
})
export class WebEngagementComponent implements OnInit {
  @Output() closeWebEngage: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }
  closePanel() {
    this.closeWebEngage.emit(false)
  }
}
