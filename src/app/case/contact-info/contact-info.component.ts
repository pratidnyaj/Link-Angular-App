import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  constructor() { }

  @Input() contactInfoIP : any = {};

  ngOnInit(): void {
  }

}
