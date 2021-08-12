import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  constructor(private caseService: CaseService, private modalService: NgbModal) { }

  @Input() selectedCaseId: string = "";
  contactInfo: any = [];
  closeResult: string = '';

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.selectedCaseId.currentValue);

    let contactInfoRq: any = {
      "caseId": changes.selectedCaseId.currentValue
    }

    this.caseService.getContactInfo(contactInfoRq).subscribe(data => {
      if (data.status) {
        this.contactInfo = data.data[0];
      }
      //console.log('getContactInfo', this.contactInfoIP);
    })

  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
