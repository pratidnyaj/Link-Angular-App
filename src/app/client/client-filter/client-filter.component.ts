import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-filter',
  templateUrl: './client-filter.component.html',
  styleUrls: ['./client-filter.component.scss']
})
export class ClientFilterComponent implements OnInit {

  constructor() { }
  IsToggleSearchBoxOpen: boolean = false;

  toggleSearchBox() {
    this.IsToggleSearchBoxOpen = !this.IsToggleSearchBoxOpen;    
  }
  ngOnInit(): void {
  }

}
