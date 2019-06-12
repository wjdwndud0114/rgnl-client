import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, fromEventPattern, config } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '@/_models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor (private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue (): User {
        return this.currentUserSubject.value;
    }

    login (username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/login`, { "email": username, "password": password })
            .pipe(map(user => {
                if (user && user.accessToken) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        this.http.post<any>(`${environment.apiUrl}/token/revoke`, { "token": this.currentUserValue.accessToken });
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
