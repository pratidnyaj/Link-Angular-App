import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-interaction-disposition',
  templateUrl: './interaction-disposition.component.html',
  styleUrls: ['./interaction-disposition.component.scss']
})
export class InteractionDispositionComponent implements OnInit {
  dispositionData: any[] = [];
  selectedDisposition: any;

  subdispositionData: any[] = [];
  selectedSubdisposition: any;

  subsubdispositionData: any[] = [];
  selectedsubsubdisposition: any;


  constructor(private caseservice: CaseService) { }

  ngOnInit(): void {
    
    let ReqparameterDisposition =
    {
      "dispositionLevel": "Case",
      "Id": "",
      "flag": "Disposition"
    }
    this.caseservice.postData('Getdisposition', ReqparameterDisposition)
    // this.caseservice.getDisposition(ReqparameterDisposition)
      .subscribe((res) => {
        this.dispositionData = res.data;
        console.log(res.data);
        console.log(this.dispositionData);
      });

  }

  public onChangedisposition(event: any[]): void {
    
    if (event.length == 0) {
      this.subdispositionData = [];
    }
    console.log(event);
    let ReqparameterSubdisp =
    {
      "dispositionLevel": "",
      "Id": event,
      "flag": "Subdisposition"
    }

    this.caseservice.postData('Getsubdisposition', ReqparameterSubdisp)
    // this.caseservice.getSubdisposition(ReqparameterSubdisp)
      .subscribe((res) => {
        this.subdispositionData = res.data;
        console.log(this.subdispositionData);
      });

    this.selectedDisposition = event;
  }
  public onChangeSubdisposition(event: any[]): void {
    if (event.length == 0) {
      this.subsubdispositionData = [];
    }
    let ReqparameterSubSubdisp =
    {
      "dispositionLevel": "",
      "Id": event,
      "flag": "Subsubdisposition"
    }
    this.caseservice.postData('Getsubsubdisposition', ReqparameterSubSubdisp)
    // this.caseservice.getSubsubdisposition(ReqparameterSubSubdisp)
      .subscribe((res) => {
        this.subsubdispositionData = res.data;
        console.log(this.subsubdispositionData);
      });
      this.selectedSubdisposition = event;

  } 
  public onChangesubsubdisposition(event: any[]): void {
   
    this.selectedsubsubdisposition = event;
    console.log(this.selectedsubsubdisposition);
    let selectedOptions={
      "disposition":this.selectedDisposition,
      "SubDisposition":this.selectedSubdisposition,
      "SubSubDisposition":this.selectedsubsubdisposition
      }
      console.log ("selected values "+selectedOptions);
    this.caseservice.emitDrowpdownSelectedData(selectedOptions);
   
    }
  

}


