import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-firebase-notification',
  templateUrl: './firebase-notification.component.html',
  styleUrls: ['./firebase-notification.component.scss']
})
export class FirebaseNotificationComponent implements OnInit {
  userKey: string = "";
  items: any = [];
  itemChanges: any = {};

  subscription: Subscription | undefined;
  constructor(private fireDb: AngularFireDatabase, private toastr: ToastrService, private router: Router, private caseService: CaseService) { }

  ngOnInit(): void {
    this.getFirebasedata();
  }
  getFirebasedata() {
    this.userKey = sessionStorage.getItem('fireBaseUserKey') || "";
    let firebaseDbPath = '/items/' + this.userKey;
    this.subscription = this.fireDb.object(firebaseDbPath)
      .snapshotChanges()
      .pipe(map(a => {
        const data = a.payload.val();
        const id = a.payload.key;
        return { id, data }
      })
      )
      .subscribe(data => {
        this.itemChanges = data;
        if (this.itemChanges.data?.action == 'LoggedIn') {
          // this.items.push(this.itemChanges.data);
          // this.toastr.success(this.itemChanges.data.action);
        }
        else if (this.itemChanges.data?.action == 'CaseCreated') {
          this.items.push(this.itemChanges.data);
          this.toastr.success('New Case arrived.');
        }
      });


  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
  }

  redirectCase() {
    this.router.navigateByUrl('/case');
    this.caseService.caselistReload();

  }
}
