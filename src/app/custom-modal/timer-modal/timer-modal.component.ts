import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';
declare const $: any;
@Component({
  selector: 'app-timer-modal',
  templateUrl: './timer-modal.component.html',
  styleUrls: ['./timer-modal.component.scss']
})
export class TimerModalComponent implements OnInit {
  subscriptionPopupModal: Subscription | undefined;
 
  // @HostListener('click', ['$event'])
  @HostListener('keyup', ['$event'])
  @HostListener('wheel', ['$event'])
  @HostListener('onmousedown', ['$event'])
  @HostListener('mousemove', ['$event'])
  @HostListener('onmouseup', ['$event'])
onHostClick(event: MouseEvent) {
  event.stopPropagation();
}

// @HostListener('document:onmousedown', ['$event'])
  constructor(private caseService : CaseService, private router : Router) {

  }
  ngOnInit(): void {
    this.myFunctionOne()
  }
  
  myFunctionOne() {
      this.subscriptionPopupModal = this.caseService.timerModalPopup.subscribe((data : any) =>
       {
        if(data.type){
              $('#timerContent').modal('show');
            }else{
              $('#timerContent').modal('hide');
            }
      })
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscriptionPopupModal?.unsubscribe();
  }
  staySamePage(){
    // $('#timerContent').modal('hide');
  }
  logOutUser() {
    this.router.navigate(['/login'])
    window.location.reload();
    sessionStorage.clear();
}
}
