import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/_models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor (private http: HttpClient) { }

    create (title: string, content: string, id: number) {
        return this.http.post<User>(`${environment.apiUrl}/posts`, { "title": title, "content": content, "userId": id });
    }
}
