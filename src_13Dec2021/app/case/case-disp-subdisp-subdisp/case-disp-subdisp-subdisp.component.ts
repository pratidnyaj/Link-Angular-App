import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-disp-subdisp-subdisp',
  templateUrl: './case-disp-subdisp-subdisp.component.html',
  styleUrls: ['./case-disp-subdisp-subdisp.component.scss']

})
export class CaseDispSubdispSubdispComponent implements OnInit {

  dispositionData: any[] = [];
  selectedDisposition: any;

  subdispositionData: any[] = [];
  selectedSubdisposition: any;

  subsubdispositionData: any[] = [];
  selectedsubsubdisposition: any;


  constructor(private caseservice: CaseService) { }

  ngOnInit(): void {
    // 
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
    // 
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

  public onChangeSubSubdisposition(event: any[]): void {
    this.selectedsubsubdisposition = event;
    let selectedOptions={
    "selectedDisposition":this.selectedDisposition,
      "selectedSubdisposition":this.selectedSubdisposition,
      "selectedsubsubdisposition":this.selectedsubsubdisposition,
      
      }
      console.log('92=================>',selectedOptions);
      
    this.caseservice.emitDrowpdownSelectedData(selectedOptions);
  }
}
