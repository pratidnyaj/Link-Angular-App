import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-info',
  templateUrl: './case-info.component.html',
  styleUrls: ['./case-info.component.scss']
})
export class CaseInfoComponent implements OnInit {

  constructor(private caseService : CaseService) { }

  caseInfo : any = {};

  ngOnInit(): void {
    this.caseService.caseInfo$.subscribe(message=>{
      console.log(message.caseid);

      this.caseService.getCaseInfo().subscribe(data=>
        {                  
          this.caseInfo = data.data[0];
          console.log(this.caseInfo);
        })

      
    })
  }

  

}