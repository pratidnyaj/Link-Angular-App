import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Subject, timer, Subscription } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { CaseService } from './service/case.service';
import { AuthService } from './_helpers/PasswordValidator/auth/auth.timerLogout';
import { environment } from 'src/environments/environment';
// https://stackblitz.com/edit/angular-2rv3or?file=src%2Fapp%2Finactivity-timer.component.ts
@Component({
  selector: 'inactivity-timer',
  template: `
    <h1>User logout in:  {{ (minutesDisplay) }}:{{ (secondsDisplay) && (secondsDisplay <= lastSeconds) ? ('0' + temp).slice(-2) : '00'  }}
   </h1>
  `,
  styles: []
})
export class InactivityTimerComponent implements OnDestroy, OnInit {
  minutesDisplay = 0;
  secondsDisplay = 0;
  // endTime = 30; // minutes
  //endTime = 1; // minutes
  endTime = environment.timeLogout.numberOfMinutes
  lastSeconds = environment.timeLogout.lastSeconds
  unsubscribe$: Subject<void> = new Subject();
  timerSubscription: Subscription | undefined;
  url: string
  constructor(private authService: AuthService, private route: ActivatedRoute,
    private router: Router, private caseService: CaseService) {
    this.url = route.snapshot.url.join('');
  }

  ngOnInit() {
    this.authService.userActionOccured.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.resetTimer();
    });

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  //   const seconds = Math.floor( (total/1000) % 60 );
  // const minutes = Math.floor( (total/1000/60) % 60 );
  // const hours = Math.floor( (total/(1000*60*60)) % 24 );
  // const days = Math.floor( total/(1000*60*60*24) );

  resetTimer(endTime: number = this.endTime) {
    const interval = 1000;


    const duration = endTime * 60;
    this.timerSubscription = timer(0, interval).pipe(
      take(duration)
    ).subscribe(value =>

      this.render((duration - +value) * interval),

      err => {

      },
      () => {
        let valObj = {
          type: false
        }
        this.caseService.timerpopupModal(valObj);
        this.authService.logOutUser();

      }
    )
  }
  temp = 0;
  private render(count: any) {
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
    if (this.secondsDisplay == 0) {
      this.temp = 60;
    }
    // seconds -= 1;

    // if(this.secondsDisplay != 59){
    //   this.temp = Math.floor(this.secondsDisplay  / 2);
    //   console.log(this.temp,'asdhashdgasdasd====>');

    // }

    if (this.secondsDisplay <= this.lastSeconds && this.secondsDisplay != 0) {
     
      // debugger

      if (this.secondsDisplay) {
        if (this.temp != 0) {
          this.temp -= 1
        }

        else {
          this.temp = 59;
        }
      }

      let valObj = {
        minutesDisplay: this.minutesDisplay,
        secondsDisplay: this.secondsDisplay,
        type: true//,
        // temp:this.temp,
        // lastSeconds:this.lastSeconds
      }
      this.caseService.timerpopupModal(valObj);
    } 
    else {
      //Cloase popup
      // debugger
      let valObj = {
        minutesDisplay: this.minutesDisplay,
        secondsDisplay: this.secondsDisplay,
        type: false//,
        // temp:this.temp,
        // lastSeconds:this.lastSeconds
      }
      this.caseService.timerpopupModal(valObj);
      // this.temp = 60;
    }

  }

  private getSeconds(ticks: number) {
    const seconds = ((ticks % environment.timeLogout.numberOfSeconds) / 1000).toFixed(0); // 2 min for example 60 seconds * 60 seconds = 120...
    return this.pad(seconds);
  }



  private getMinutes(ticks: number) {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private pad(digit: any) {
    return digit <= 9 ? '0' + digit : digit;
  }





  // Hours, minutes and seconds





}