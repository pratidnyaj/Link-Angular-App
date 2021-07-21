import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-interaction-list',
  templateUrl: './case-interaction-list.component.html',
  styleUrls: ['./case-interaction-list.component.scss']
})
export class CaseInteractionListComponent implements OnInit {

  constructor(private caseService: CaseService) { }

  caseInteractions: any[] = [];

  ngOnInit(): void {
    this.caseService.caseInfo$.subscribe(message => {
      // console.log(message.caseid);

      this.caseService.getCaseInteractionHistory().subscribe(data => {
        this.caseInteractions = data.data;
        console.log(this.caseInteractions);
      })

    })
  }

}
