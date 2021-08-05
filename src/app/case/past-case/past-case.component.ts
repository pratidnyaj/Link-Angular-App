import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from 'src/app/service/case.service';
@Component({
  selector: 'app-past-case',
  templateUrl: './past-case.component.html',
  styleUrls: ['./past-case.component.scss']
})
export class PastCaseComponent implements OnInit {

  pastCases: Array<any>;
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 5;
  absoluteIndex: number = 0;

  constructor(private caseService: CaseService) { 
    this.pastCases = new Array<any>();
  }

  handlePageChange(event: number) {
    this.currentPageNumber = event;
    this.absoluteIndex = this.perPageCnt * (this.currentPageNumber - 1);
  }

  
  ngOnInit(): void {
    this.caseService.getPastCaseList().subscribe(data => {
      this.pastCases = data.data;
      this.totalRec = data.data.length;
      console.log('pastCases', this.pastCases);
    })

  }

}
