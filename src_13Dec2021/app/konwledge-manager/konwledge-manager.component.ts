import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-konwledge-manager',
  templateUrl: './konwledge-manager.component.html',
  styleUrls: ['./konwledge-manager.component.scss']
})
export class KonwledgeManagerComponent implements OnInit {
  knowledgeManagerDetailsState: boolean = true;


  @Output() closeKnowledgeManager: EventEmitter<any> = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  closePanel() {
    this.closeKnowledgeManager.emit(false);
  }

  sendDetails() {
    this.knowledgeManagerDetailsState = !this.knowledgeManagerDetailsState;
    console.log('hello');
  }

  closeKnowledgeManagerDetails(data: any) {
    this.knowledgeManagerDetailsState = data;
  }

  knowledgeData = [
    {
      id: '001',
      image: '',
      title: "Lajari",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperiores  '
    },
    {
      id: '002',
      image: '',
      title: "Taj Mahal",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperiores  '
    },
    {
      id: '001',
      image: '',
      title: "Lajari",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperiores  '
    },
    {
      id: '001',
      image: '',
      title: "Taj Mahal",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperiores  '
    },
    {
      id: '001',
      image: '',
      title: "Lajari",
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperioresLorem ipsum dolor sit amet consectetur adipisicing elit Consequuntur voluptatibus asperiores  '
    },


  ]
}
