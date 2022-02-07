import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-team-cases-list',
  templateUrl: './team-cases-list.component.html',
  styleUrls: ['./team-cases-list.component.scss']
})
export class TeamCasesListComponent implements OnInit {

  teamCasesList : any = [];
  teamsID : any;
  p: number = 1;
  constructor(private activatedRoute: ActivatedRoute,private ClientService: ClientService,private router:Router,
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
      "Flag": 'TeamCasesList'
    }
    this.ClientService.postData('getTeamsMstrById',obj)
    .subscribe(
      result => {
          this.teamCasesList = result.data;
          console.log(this.teamCasesList)
      })
  }
  editContactinfo(data){
    console.log(data);
        this.ClientService.emitClientId(data);
        this.router.navigate(['/client'])
    
      }
}
