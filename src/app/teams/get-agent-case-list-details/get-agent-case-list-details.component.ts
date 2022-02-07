import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-get-agent-case-list-details',
  templateUrl: './get-agent-case-list-details.component.html',
  styleUrls: ['./get-agent-case-list-details.component.scss']
})
export class GetAgentCaseListDetailsComponent implements OnInit {

 
  AgentCaseListList : any = [];
  agentID : any;
  p: number = 1;
  constructor(private activatedRoute: ActivatedRoute,private ClientService: ClientService,
    private modalService : NgbModal, private formBuilder: FormBuilder,private toastr: ToastrService) { 
      this.agentID = this.activatedRoute.snapshot.params.id;
      console.log(this.agentID)
    }

  ngOnInit(): void {

    this.getAgentCaseslist();

  }
  getAgentCaseslist(){
    let obj = {
      "TeamID" : this.agentID
    }
    this.ClientService.postData('getAgentCaseList',obj)
    .subscribe(
      result => {
          this.AgentCaseListList = result.data;
          console.log(this.AgentCaseListList)
      })
  }

}
