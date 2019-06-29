import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor (private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getGovUsers() {
        return this.http.get<Array<User>>(`${environment.apiUrl}/users/gov`);
    }

    create(username: string, password: string, firstname: string, lastname: string) {
        return this.http.post<User>(`${environment.apiUrl}/users`, {'email': username, 'password': password, 'firstname': firstname, 'lastname': lastname});
    }

    update(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/users/${user.Id}`, user);
    }

    delete(user: User) {
        
    }

    follow(followedid: number, followerid: number) {
        return this.http.post<any>(`${environment.apiUrl}/follow`, { "followedId": followedid, "followerId": followerid });
    }

    unfollow(govid: number) {
        return this.http.delete<any>(`${environment.apiUrl}/follow/${govid}`);
    }
}
