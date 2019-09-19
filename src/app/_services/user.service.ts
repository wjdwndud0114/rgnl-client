import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, LoginResult } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private data: DataService,
    private http: HttpClient,
  ) { }

  login = (username: string, password: string, failHandler) => {
    this.http.post<LoginResult>(`${this.baseUrl}/api/auth/login`, { userName: username, password })
    .subscribe(
      loginResult => {
        this.data.setAuthToken(loginResult.AuthToken);

        this.getUser();
      },
      error => {
        console.log('Login failed: ', error);
        failHandler(error);
      }
    );
  }

  logout = () => {
    this.data.removeAuthToken();
  }

  getUser = () => {
    this.http.get<User>(`${this.baseUrl}/api/dashboard/user`)
    .subscribe(
      user => {
        this.data.setUser(user);
      },
      error => {
        console.log('Getting user information failed: ', error);
      }
    );
  }

  register = (email: string, password: string, firstName: string, lastName: string, govAccount: boolean = false) => {
    return this.http.post(`${this.baseUrl}/api/accounts/${govAccount ? 'gov' : ''}`, { email, password, firstName, lastName });
  }
}
