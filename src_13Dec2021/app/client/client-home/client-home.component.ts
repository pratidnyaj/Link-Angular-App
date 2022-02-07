import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  closeResult: string | undefined;

   clientFullname:string|undefined;
  
   constructor(private modalService: NgbModal) { }
 
  ngOnInit(): void {
  }
  
  displayFullname(FullName:any) {
    this.clientFullname=FullName;
    console.log("fullname",FullName);
}
  openScrollableContent(longContent:any) {
    this.modalService.open(longContent, { scrollable: true });
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
