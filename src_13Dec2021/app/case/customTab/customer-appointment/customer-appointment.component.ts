import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-appointment',
  templateUrl: './customer-appointment.component.html',
  styleUrls: ['./customer-appointment.component.scss']
})
export class CustomerAppointmentComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  openScrollableContent(longContent:any) {
    this.modalService.open(longContent, { scrollable: true, size:'sm' });
  }
  ngOnInit(): void {
  }

}
