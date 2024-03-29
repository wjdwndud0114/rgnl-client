import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, LoginResult, Profile, Post } from '../_models';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.baseUrl;

  constructor (
    private data: DataService,
    private http: HttpClient,
    private router: Router,
  ) {
    // if user data retrieved from local session, update it
    this.data.authToken.pipe(first())
      .subscribe(
        token => {
          if (token) {
            this.getUser();
          }
        }
      );
  }

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

  facebookLogin = (accessToken: string, failHandler) => {
    this.http.post<LoginResult>(`${this.baseUrl}/api/externalauth/Facebook`, { accessToken })
      .subscribe(
        loginResult => {
          this.data.setAuthToken(loginResult.AuthToken);
          this.getUser();
          return true;
        },
        error => {
          console.log('Facebook Login failed: ', error);
          failHandler(error);
        }
      );
  }

  logout = () => {
    this.data.removeAuthToken();
    this.router.navigateByUrl('/');
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

  updateProfile = (profile: Profile, failHandler) => {
    this.http.post<User>(`${this.baseUrl}/api/dashboard/updateProfile`, profile)
      .subscribe(
        user => {
          this.data.setUser(user);
        },
        error => {
          console.log('Profile update failed');
          failHandler(error);
        }
      );
  }

  createPost = (post: Post) => {
    return this.http.post(`${this.baseUrl}/odata/Post`, post);
  }

  deletePost = (postId: number) => {
    return this.http.delete(`${this.baseUrl}/odata/Post(${postId})`);
  }

  updatePost = (post: Post) => {
    return this.http.patch(`${this.baseUrl}/odata/Post(${post.PostId})`, post);
  }

  getPosts = () => {
    this.http.get<Post[]>(`${this.baseUrl}/api/dashboard/posts`)
      .subscribe(
        posts => {
          this.data.setPosts(posts);
        },
        error => {
          console.log('Getting posts failed', error);
        }
      );
  }

  getFollowed = () => {
    this.http.get<User[]>(`${this.baseUrl}/api/dashboard/followed`)
    .subscribe(
      followed => {
        this.data.setFollowed(followed);
      },
      error => {
        console.log('Getting followed failed', error);
      }
    );
  }

  getGovs = () => {
    this.http.get<User[]>(`${this.baseUrl}/api/dashboard/govs`)
    .subscribe(
      govs => {
        this.data.setGovs(govs);
      },
      error => {
        console.log('Getting followed failed', error);
      }
    );
  }

  followUser = (govId: number) => {
    this.http.post(`${this.baseUrl}/api/dashboard/follow/${govId}`, {})
    .subscribe(
      data => {
        this.data.addFollowed(govId);
      },
      error => {
        console.log('Follow failed', error);
      }
    );
  }

  unfollowUser = (govId: number) => {
    this.http.post(`${this.baseUrl}/api/dashboard/unfollow/${govId}`, {})
    .subscribe(
      data => {
        this.data.removeFollowed(govId);
      },
      error => {
        console.log('Unfollow failed', error);
      }
    );
  }
}
