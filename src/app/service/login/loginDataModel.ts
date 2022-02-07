export class LoginRQ {
    emailID!: string;
    password!: string;
    // userType!: string;
    // sessionRequired!: string;
}

export class LoginRS 
{
    status: boolean;
    statusCode: number;
    message: string;
    data!: any;

    constructor()
    {
        this.status=false;
        this.statusCode = 0;
        this.message = "";        
    }
}

export interface LoggedUser {
    UserID: string;
    FullName: string;
    EmailID: string;
    PhoneNo: string;
    RoleID: number;
}

export interface RelatedTeams {
    TeamID: number;
}
export class RoleRQ {
    RoleId!: string;
    }
