import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { map, first } from 'rxjs/operators';

import { User } from '@/_models';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userSubscription: Subscription;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor (
        private http: HttpClient,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        if (this.currentUserValue) {
            this.refreshUser();
        }
    }

    public get currentUserValue (): User {
        return this.currentUserSubject.value;
    }

    login (username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/login`, { "email": username, "password": password })
            .pipe(map(user => {
                if (user && user.AccessToken) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout () {
        return this.http.post<any>(`${environment.apiUrl}/token/revoke`, { "token": this.currentUserValue.AccessToken.RefreshToken })
            .pipe(map(res => {
                this.removeUser();
                return res;
            }));
    }

    removeUser() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    refreshUser () {
        return this.http.post<User>(`${environment.apiUrl}/users/refresh`, {})
            .pipe(map(user => {
                if (user) {
                    user.AccessToken = this.currentUserValue.AccessToken;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }
                return user;
            }))
    }

    subscribeToUser (callBack) {
        this.userSubscription = interval(5000).subscribe(
            val => {
                this.refreshUser().pipe(first()).subscribe(
                    data => {
                        callBack(data);
                    },
                    error => {
                        this.removeUser();
                        this.router.navigate(["/login"]);
                    }
                );
            }
        );
    }

    unsubscribeToUser () {
        this.userSubscription.unsubscribe();
    }
}
