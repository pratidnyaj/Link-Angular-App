import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-side-conversation',
  templateUrl: './side-conversation.component.html',
  styleUrls: ['./side-conversation.component.scss']
})
export class SideConversationComponent implements OnInit {
  constructor(private modalService: NgbModal) { }


  sidecondata(sideconinfo: any) {
    this.modalService.open(sideconinfo, { scrollable: true, size: 'sm' });
  }


  sideconversation(longContent:any) {
    this.modalService.open(longContent, { scrollable: true });
  }

  ngOnInit(): void {
  }


}
