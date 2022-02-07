import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    _userActionOccured: Subject<void> = new Subject();
    get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };
    constructor(private router: Router) { }
    notifyUserAction() {
        this._userActionOccured.next();
    }
    logOutUser() {
        this.router.navigate(['/login'])
        window.location.reload();
        sessionStorage.clear();
    }

}