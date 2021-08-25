import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-case-info',
  templateUrl: './case-info.component.html',
  styleUrls: ['./case-info.component.scss']
})
export class CaseInfoComponent implements OnInit {
  closeResult: string = '';

  constructor(private caseService: CaseService, private modalService: NgbModal) { }

  caseInfo: any = {};
  subscription: Subscription | undefined;
  selectedCaseId: string = "";

  ngOnInit(): void {

    this.subscription = this.caseService.observeCaseData().subscribe(message => {
      //console.log('case-info',message);      

      let caseInfoRq: any = {
        "caseId": message.caseid
      }

      this.caseService.getCaseInfo(caseInfoRq).subscribe(data => {
        //console.log('case-info', data);
        if (data.status) 
        {
          this.caseInfo = data.data[0];
          this.selectedCaseId = message.caseid;          
        }
        // console.log(data);
      })

    })
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription?.unsubscribe();
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'sm' }).result.then((result) => {
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