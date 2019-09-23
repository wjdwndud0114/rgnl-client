import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);
  private _authToken: BehaviorSubject<string> = new BehaviorSubject(null);

  public get user () { return this._user.asObservable(); }
  public get authToken () { return this._authToken.asObservable(); }

  private dataStore: {
    user: User,
    authToken: string,
  } = {
    user: null,
    authToken: null,
  };

  constructor () {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      this.setAuthToken(token);
    }
    const user = JSON.parse(sessionStorage.getItem('user')) as User;
    if (user) {
      this.setUser(user);
    }
  }

  public setUser (user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.dataStore.user = user;
    this._user.next(this.dataStore.user);
  }

  public setAuthToken (authToken: string) {
    this.dataStore.authToken = authToken;
    this._authToken.next(this.dataStore.authToken);
    sessionStorage.setItem('authToken', authToken);
  }

  public removeAuthToken () {
    this.dataStore.user = null;
    this._user.next(this.dataStore.user);
    this.dataStore.authToken = null;
    this._authToken.next(this.dataStore.authToken);
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
  }
}
