import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CaseService } from 'src/app/service/case.service';

@Component({
  selector: 'app-case-list-display',
  templateUrl: './case-list-display.component.html',
  styleUrls: ['./case-list-display.component.scss']
})
export class CaseListDisplayComponent implements OnInit {

  oInxData: any = "";
  @Output() emailEditorEvent = new EventEmitter<any>();

  @ViewChild('divEmailEditorScroll') divEmailEditorScrollEl?:ElementRef;
  private divEmailEditorScrollRef: any;

  constructor(private caseService: CaseService) { }

  @Input() set setProp(value: any) 
  {
    this.oInxData = value;
  }

  get getInxData(): any {
    return this.oInxData;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.divEmailEditorScrollRef = this.divEmailEditorScrollEl?.nativeElement;
    this.divEmailEditorScrollRef.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  sendMail()
  {
    this.emailEditorEvent.emit({"action":"send","data":this.oInxData});
  }

  discardMail()
  {
    this.emailEditorEvent.emit({"action":"discard","data":this.oInxData});
  }

  config :any= {
    placeholder: 'Type...',
    tabsize: 2,
    height: '120px',
    uploadImagePath: '/api/upload',
    toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['table']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
}