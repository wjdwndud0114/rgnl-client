import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private data: DataService,
    private http: HttpClient,
  ) { }

  login = (username: string, password: string) => {
    this.http.post<User>(`${this.baseUrl}/login`, { username, password })
    .subscribe(
      user => {
        if (user)
      }
    );
  }
}
