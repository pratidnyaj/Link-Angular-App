import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit {
  p: number = 1;
  totalRec: number = 0;
  currentPageNumber: number = 1;
  perPageCnt: number = 10;
  absoluteIndex: number = 0;
  userMasterData: any[] = [];
  constructor(private ClientService:ClientService) { }

  ngOnInit(): void {
 let    Reqparameter = 
    {
      "AgentDesignation": "",
      "AgentRoles": "",
      "AgentTeams": "",
      "AgentStatus": "1",
      "PageNumber": "1",
      "Limit": "10"
    }

     
    
    this.ClientService.postData('Getagents',Reqparameter).subscribe(result => {
     console.log('resukt ---31---99999999999999999999999999999999999999999-->',result)
   
     if (result.data) {
      this.userMasterData = result.data.data;
      this.totalRec = result.data.totalRecord;
    }
    else {
      this.userMasterData = [];
      this.totalRec = 0;
    }
   
   
    })



  }



  handlePageChange(event: number) {
    this.currentPageNumber = event; 
    this.absoluteIndex = this.perPageCnt * (this.currentPageNumber);
// let Reqparameter =
// {
//   "ContactId": this.msgID,//"P7Y6LE",
//   "Flag": "ViewCase",
//   "PageNumber":this.currentPageNumber,
//   "Limit":'10'
// }
// this.ClientService.postData('getCaseForContact',Reqparameter).subscribe(result => {
//   if (result.data) {
//     this.CaselevelData = result.data.data;
//     this.totalRec = result.data.totalRecord;
//     console.log('getClientCaseData', this.CaselevelData);
//   }
//   else {
//     this.CaselevelData = [];
//     this.totalRec = 0;
//   }
// })

  }

  usermasterdata=[
    {
      "Photo":'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
      "FullName":'xzsdfgg',
      "RoleName" : "agent",
      "EmailID":'xsua@unfyd.com',
      "PhoneNo":'0213654789',
      "IsActive" :'true'
    }

  ]

  user = [
    {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    },
    {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    },
    {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    }, {
      "id": 1,
      "GroupName": "Festival Sale Group",
      "GroupDescription": "Lorem Ipsum is simply dummy tex....",
      "CreatedBy": "UNFYD-Admin",
      "dateTime": "12/30/2020 2:24:36 PM",
      "Modified": "UNFYD-Admin",
      "modifiDate": "12/30/2020 2:24:36 PM",
     
    },
  ]
}
