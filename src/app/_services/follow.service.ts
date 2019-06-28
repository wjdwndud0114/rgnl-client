import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class FollowService {

    constructor (
        private http: HttpClient,
        private authenticationService: AuthenticationService) { }

    follow(id: number) {
        return this.http.post(`${environment.apiUrl}/follow`, {"followedid": id, "followerid": this.authenticationService.currentUserValue.Id});
    }

    unfollow(id: number) {
        return this.http.delete(`${environment.apiUrl}/follow/${id}`);
    }
}
