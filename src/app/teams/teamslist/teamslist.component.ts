import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-teamslist',
  templateUrl: './teamslist.component.html',
  styleUrls: ['./teamslist.component.scss']
})
export class TeamslistComponent implements OnInit {
  p: number = 1;
  teamMemerList : any =[];
  teamsForm!: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,private ClientService: ClientService,
    private modalService : NgbModal, private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTeamslist();
    this.teamsForm = this.formBuilder.group({
      teamsName: [null],
      description: [null],
   
    })
  }

  openVertically(teamsModal){
    this.modalService.open(teamsModal, { centered: true, scrollable: true, size: 'sm' });
  }

  getTeamslist(){
    let obj = {
      "Flag" : ""
    }
    this.ClientService.postData('getTeamMstr',obj)
    .subscribe(
      result => {
          this.teamMemerList = result.data;
      })
  }


  saveTeam(){
let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let obj = {
TeamId :(this.teamID === undefined ? "" : this.teamID),  
TeamName :this.teamsForm.value.teamsName,  
TeamDesc :this.teamsForm.value.description,
IsActive :"1",  
CreatedBy : JSON.parse(oLoggedInUser).UserID,  
Flag :(this.teamID === undefined ? 'INSERT' : 'UPDATE')
}

this.ClientService.postData('createUpdateTeams',obj)
    .subscribe(
      result => {
          // this.teamMemerList = result.data;
console.log(result.data[0].Message)
          this.toastr.success(result.data[0].Message);
          this.closefrom();
      })

  }
  
  editTeamsModal(teamsModal, data: any) {
    this.editteams(data)
    this.modalService.open(teamsModal, { centered: true, scrollable: true, size: 'sm' });
  }
  teamID: any;
  editteams(data){
    console.log(data);
    // TeamID
    console.log('---------------->',data.TeamID);
      this.teamID=  data.TeamID
    this.teamsForm.patchValue({
      teamsName: data.TeamName,
      description: data.TeamDesc
    })
    // this.UpdateAcountID = data.TeamID
  }

  deleteTeams(data){
    let oLoggedInUser: string = sessionStorage.getItem("_loggedInUser") || "";
    let obj = {
      TeamId :data.TeamID,  
      TeamName :'',  
      TeamDesc :'',
      IsActive :'',  
      CreatedBy : JSON.parse(oLoggedInUser).UserID,  
      Flag :'DELETE'
      }
      
      this.ClientService.postData('createUpdateTeams',obj)
          .subscribe(
            result => {
              this.toastr.success(result.data[0].Message);
              this.closefrom();

            })
    
  }
  closefrom(){
    this.getTeamslist();
    this.teamID = undefined;
    this.teamsForm.reset();
    this.modalService.dismissAll()
  }
}
