import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/service/client.service';


@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  constructor(private ClientService: ClientService) { }
  contactInfo: any = {};
  subscription: Subscription | undefined;
  selectedContactId: string = "";
  @Output() valueChange = new EventEmitter();


  ngOnInit(): void {
    this.subscription = this.ClientService.observeContactData().subscribe(message => {
      let contactInfoRq: any = {
        "ContactID": message.ContactID,
        "Flag": "ViewContact",
        "PageNumber":"",
        "Limit":""
      }
    this.ClientService.postData('getClientContactInfo', contactInfoRq).subscribe(data => {
        if (data.status) {
          this.contactInfo = data.data[0];
          this.valueChange.emit(this.contactInfo.FullName);
          this.selectedContactId = message.ContactID;
        }
      })

    })
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
  }


}
