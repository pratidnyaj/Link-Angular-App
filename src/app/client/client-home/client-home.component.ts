import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/service/client.service';


@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {

  closeResult: string | undefined;

   clientFullname:string|undefined;
   subscriptionClientdata : Subscription | undefined;
   constructor(private modalService: NgbModal,private ClientService: ClientService) { }
 
  ngOnInit(): void {
    this.selectContact()
  }
  
  displayFullname(FullName:any) {
    console.log(FullName);
    
    // this.clientFullname='sssss';
    // console.log("fullname",FullName);
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



///
profileUrl : any;
selectContact() {
this.subscriptionClientdata = this.ClientService._contactSubjectSource.subscribe((result) => {
 console.log('p---------------->',result)

if(result.profilePhotoUrl === null){

}else{
  
}

 this.profileUrl = (result.profilePhotoUrl === null ? '/assets/images/emptyProfile.jpg' : result.profilePhotoUrl )

this.clientFullname = result.FullName;


  })
}
ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.subscriptionClientdata?.unsubscribe();
}
}
