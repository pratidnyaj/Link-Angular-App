import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  @Output() closeNotification: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }
  closePanel() {
    this.closeNotification.emit(false)
  }
  Notify_data = [{
    time: "2.30PM",
    title: 'Notification Header',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    time: "2.30PM",
    title: 'Notification Header',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    time: "2.30PM",
    title: 'Notification Header',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    time: "2.30PM",
    title: 'Notification Header',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    time: "2.30PM",
    title: 'Notification Header',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  },
  {
    time: "2.30PM",
    title: 'Notification Header',
    data: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
  }




  ]

}
