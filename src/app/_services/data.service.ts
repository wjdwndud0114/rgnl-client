import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);

  public get user () { return this._user.asObservable(); }

  private dataStore: {
    user: User
  } = {
    user: null
  };

  constructor () { }

  public setUser (user: User) {
    this.dataStore.user = user;
    this._user.next(this.dataStore.user);
  }
}
