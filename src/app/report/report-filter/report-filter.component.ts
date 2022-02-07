import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { ReportService } from 'src/app/service/report.service';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss']
})

export class ReportFilterComponent implements OnInit, OnChanges {
  modelFrdt: NgbDateStruct | undefined;
  today = this.calendar.getToday();

  modelTodt: NgbDateStruct | undefined;
  
  

  constructor(private ReportService: ReportService,private calendar: NgbCalendar) { }
  // @input decorator used to fetch the 
  // property from the parent component.

  @Input()
  data: any = {};
  nexstate: boolean = false;
  panelId: string = "";

  teamsData: any[] = [];
  selectedTeams: any=[];

  agentsData: any[] = [];
  selectedAgents: any =[]

  channelData: any[] = [];
  selectedChannel: any=[];

  fromDate:any="";
  toDate:any="";

  ngOnInit(): void {
    let ReqparameterTeams =
    {
      "TeamId": "",
      "UserId": "",
      "Flag": "Teams"
    }

    this.ReportService.postData('GetTeamsData',ReqparameterTeams)
    // this.ReportService.getTeamsData(ReqparameterTeams)
      .subscribe((res) => {
        this.teamsData = res.data;
        console.log(this.teamsData);
      });

      let oLoggedInUser=sessionStorage.getItem("_loggedInUser") || "";
      let ReqparameterChannel =
      {
        "TeamId": "",
        "UserId": JSON.parse(oLoggedInUser).UserID,
        "Flag": "Channel"
      }
      this.ReportService.postData('GetChannelData',ReqparameterChannel)
      // this.ReportService.getChannelData(ReqparameterChannel)
        .subscribe((res) => {
          this.channelData = res.data;
          console.log(this.channelData);
        });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes.data.currentValue);
    this.nexstate = changes.data.currentValue.nextState;
    this.panelId = changes.data.currentValue.panelId;
  }

  Search() {
    //trigger selected contact object details of all the subscribers.
    //client-info
    let selectedOptions={
      "fromDate":this.modelFrdt?.day+'/'+this.modelFrdt?.month+'/'+this.modelFrdt?.year,//this.fromDate,
      "toDate":this.modelTodt?.day+'/'+this.modelTodt?.month+'/'+this.modelTodt?.year,
      "teams":this.selectedTeams,
      "agents":this.selectedAgents,
      "channel":this.selectedChannel
      }
    this.ReportService.emitReportData(selectedOptions);
    console.log(this.nexstate);
    console.log(this.panelId);
    console.log(this.selectedTeams);
    console.log(this.selectedAgents);
    console.log(this.selectedChannel);
    console.log(this.modelFrdt?.day+'/'+this.modelFrdt?.month+'/'+this.modelFrdt?.year);
    console.log(this.modelTodt?.day+'/'+this.modelTodt?.month+'/'+this.modelTodt?.year);

  }

  public onChangeTeams(event: any[]): void {
    if(event.length==0){
    this.agentsData =[];
    }
    console.log(event.join());
    let ReqparameterAgents =
    {
      "TeamId": event.join(),
      "UserId": "",
      "Flag": "Agents"
    }
    this.ReportService.postData('GetAgentsData',ReqparameterAgents)
    // this.ReportService.getAgentsData(ReqparameterAgents)
      .subscribe((res) => {
        this.agentsData = res.data;
        console.log(this.agentsData);
      });

  }
  public onChangeAgents(event: any[]): void {
    if(event.length>0){
this.selectedAgents=event.join();
    }
    
  }
  public onChangeChannel(event: any[]): void {
    if(event.length>0){
      this.selectedChannel=event.join();
    }
  }

  public onChangeFromdate(event: any[]): void {
    if(event.length>0){
      this.fromDate=event;
    }
  }
  public onChangeTodate(event: any[]): void {
    if(event.length>0){
      this.toDate=event;
    }
  }
}
