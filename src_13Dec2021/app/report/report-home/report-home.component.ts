import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/service/report.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrls: ['./report-home.component.scss']
})
export class ReportHomeComponent implements OnInit {

  constructor(private ReportService: ReportService) { 
   
  }

  // This property is to be sent to the child component.
   data ={
     "nextState":false,
     "panelId":""
   }
  public toggleAccordian(props: NgbPanelChangeEvent): void {
    
    this.data.nextState=props.nextState;// true === panel is toggling to an open state 
       // false === panel is toggling to a closed state
       this.data.panelId= props.panelId;

//      props.preventDefault(); // don't toggle the state of the selected panel
  }
  
  
  ngOnInit(): void {}

}
