import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-list-display',
  templateUrl: './case-list-display.component.html',
  styleUrls: ['./case-list-display.component.scss']
})
export class CaseListDisplayComponent implements OnInit {

  oInxData: any = "";
  constructor(private caseService: CaseService) { }

  @Input() set setProp(value: any) 
  {
    this.oInxData = value;
  }

  get getInxData(): any {
    return this.oInxData;
  }

  ngOnInit(): void {

  }

  sendMail()
  {
    console.log('sendMail', this.oInxData);
    alert('send');
  }
}