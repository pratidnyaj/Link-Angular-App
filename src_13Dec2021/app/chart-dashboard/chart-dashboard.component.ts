import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})
export class ChartDashboardComponent implements OnInit {

  constructor() { }
  @Output() closeDashboard: EventEmitter<any> = new EventEmitter;

  ngOnInit(): void {
  }
  closePanel() {
    this.closeDashboard.emit(false)
  }
}
