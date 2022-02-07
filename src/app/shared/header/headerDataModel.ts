export class CONTACTRQ {
   
  userType!: string;
  sessionRequired!:string;
  contactName!: string;
  primaryEmail!: string;
  accountId!: string;
  language!: string;
  primaryPhone!: string;
  altEmail1!: string;
  altEmail2!: string;
  altEmail3!: string;
  altEmail4!: string;
  altPhone1!: string;
  altPhone3!: string;
  altPhone4!: string;
  altPhone2!: string;
  timeZoneId!: string;
  designation!: string;
  address!: string;
  city!: string;
  status!: boolean;
  Blockedstatus!: boolean;
  notes!: string;
  photo!: string;
  password!: string;
  type!: string;
  reqID!: string;
 facebook!: string;
  Instagram!: string;
  Whatsapp!: string;
  Twitter!: string;
  UserID!: string;

  constructor()
  {
this.userType= "",
this.sessionRequired= "",
this.contactName= "",
this.primaryEmail= "",
this.accountId= "",
this.language= "",
this.primaryPhone= "",
this.altEmail1= "",
this.altEmail2= "",
this.altEmail3= "",
this.altEmail4= "",
this.altPhone1= "",
this.altPhone3= "",
this.altPhone4= "",
this.altPhone2= "",
this.timeZoneId= "85",
this.designation= "",
this.address= "",
this.city= "",
this.status= true,
this.Blockedstatus= false,
this.notes= "",
this.photo= "",
this.password= "",
this.type= "Contact",
this.reqID= "",
this.facebook= "",
this.Instagram= "",
this.Whatsapp= "",
this.Twitter= "",
this.UserID= sessionStorage.getItem("_loggedInUser") || ""

  }
}
