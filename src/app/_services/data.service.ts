import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import { Post } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);
  private _authToken: BehaviorSubject<string> = new BehaviorSubject(null);
  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject(null);
  private _followed: BehaviorSubject<User[]> = new BehaviorSubject(null);
  private _following: BehaviorSubject<User[]> = new BehaviorSubject(null);
  private _govs: BehaviorSubject<User[]> = new BehaviorSubject(null);

  public get user () { return this._user.asObservable(); }
  public get authToken () { return this._authToken.asObservable(); }
  public get posts () { return this._posts.asObservable(); }
  public get followed () { return this._followed.asObservable(); }
  public get following () { return this._following.asObservable(); }
  public get govs () { return this._govs.asObservable(); }

  private dataStore: {
    user: User,
    authToken: string,
    posts: Post[],
    followed: User[],
    following: User[],
    govs: User[],
  } = {
    user: null,
    authToken: null,
    posts: null,
    followed: null,
    following: null,
    govs: null,
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

  public setPosts (posts: Post[]) {
    this.dataStore.posts = posts;
    this._posts.next(this.dataStore.posts);
  }

  public addPost (post: Post) {
    this.dataStore.posts.unshift(post);
    this._posts.next(this.dataStore.posts);
  }

  public removePost (postId: number) {
    const i = this.dataStore.posts.findIndex(p => p.PostId === postId);
    this.dataStore.posts.splice(i, 1);
    this._posts.next(this.dataStore.posts);
  }

  public updatePost (post: Post) {
    const i = this.dataStore.posts.findIndex(p => p.PostId === post.PostId);
    this.dataStore.posts[i] = post;
    this._posts.next(this.dataStore.posts);
  }

  public setFollowed (followed: User[]) {
    this.dataStore.followed = followed;
    this._followed.next(this.dataStore.followed);
  }

  public addFollowed (id: number) {
    this.dataStore.followed.push(this.dataStore.govs.find(g => g.Id === id));
    this._followed.next(this.dataStore.followed);
  }

  public removeFollowed (id: number) {
    const i = this.dataStore.followed.findIndex(f => f.Id === id);
    this.dataStore.followed.splice(i, 1);
    this._followed.next(this.dataStore.followed);
  }

  public setFollowing (following: User[]) {
    this.dataStore.following = following;
    this._following.next(this.dataStore.following);
  }

  public setGovs (govs: User[]) {
    this.dataStore.govs = govs;
    this._govs.next(this.dataStore.govs);
  }
}
