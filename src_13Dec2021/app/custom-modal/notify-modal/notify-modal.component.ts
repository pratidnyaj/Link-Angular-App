import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
declare const $: any;
@Component({
  selector: 'app-notify-modal',
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.scss']
})
export class NotifyModalComponent implements OnInit {
  constructor(private caseService: CaseService) { }
  display: any;
  ngOnInit(): void {
    this.myFunctionOne();
  }
  subscriptionPopupModal: Subscription | undefined;
  myFunctionOne() {
    this.display = 'block';
    this.subscriptionPopupModal = this.caseService.pushNotificationModal.subscribe((data) => {
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
