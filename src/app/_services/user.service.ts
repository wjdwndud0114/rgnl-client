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

    create(username: string, password: string, firstname: string, lastname: string) {
        return this.http.post<any>(`${environment.apiUrl}/users`, {'email': username, 'password': password, 'firstname': firstname, 'lastname': lastname});
    }

    update(user: User) {
        return this.http.post<User>(`${environment.apiUrl}/users/${user.id}`, user)
    }

    delete(user: User) {
        
    }
}
