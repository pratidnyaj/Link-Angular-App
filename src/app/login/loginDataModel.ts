export class LoginRQ {
    emailID!: string;
    password!: string;
    userType!: string;
    sessionRequired!: string;
}

export class LoginResult {
    Result: string;
    PendingStat: boolean;

    constructor()
    {
        this.Result = "";
        this.PendingStat = false;
    }
}

export class LoginRS {
    data: LoginResult[];

    constructor()
    {
        this.data = [];
    }
}