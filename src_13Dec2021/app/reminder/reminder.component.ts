import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  @Output() closeClock: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }
  closePanel() {
    this.closeClock.emit(false)
  }
  
  Reminder_data = [{
    id: "14251121",
    title: 'Appointment Header',
    date: 'Date & Time - 05/7/2021 15:34'
  }]

  
}
