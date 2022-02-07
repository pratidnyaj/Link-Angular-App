import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-team-agent-list',
  templateUrl: './team-agent-list.component.html',
  styleUrls: ['./team-agent-list.component.scss']
})
export class TeamAgentListComponent implements OnInit {

  
  searchText;


  teamAgentList : any = [];
  teamsID : any;
  p: number = 1;
  constructor(private activatedRoute: ActivatedRoute,private ClientService: ClientService,
    private modalService : NgbModal, private formBuilder: FormBuilder,private toastr: ToastrService) { 
      this.teamsID = this.activatedRoute.snapshot.params.id;
      console.log(this.teamsID)
    }

  ngOnInit(): void {

    this.getTeamsAgentlist();

  }
  getTeamsAgentlist(){
    let obj = {
      "TeamID" : this.teamsID,
      "Flag": 'TeamAgentList'
    }
    this.ClientService.postData('getTeamsMstrById',obj)
    .subscribe(
      result => {
          this.teamAgentList = result.data;
          console.log(this.teamAgentList)
      })
  }
  openVertically(agentModal){
    this.modalService.open(agentModal, { centered: true, scrollable: true, size: 'sm' });
  }
}
