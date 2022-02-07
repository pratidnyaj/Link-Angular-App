import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
declare const $: any;

@Component({
  selector: 'app-merge-modal',
  templateUrl: './merge-modal.component.html',
  styleUrls: ['./merge-modal.component.scss']
})
export class MergeModalComponent implements OnInit {

  constructor(private caseService: CaseService) { }
  display: any;
  ngOnInit(): void {
    this.myFunction();
  }
  subscriptionPopupModal: Subscription | undefined;
  myFunction() {
    this.display = 'block';
    this.subscriptionPopupModal = this.caseService.mergeModal.subscribe((data) => {
      this.display = 'none';
    })
  }

  closeModal() {
    this.display = 'none';
    this.caseService.modalcloseInactive();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionPopupModal?.unsubscribe();
  }

}
