import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '@/_models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor (private http: HttpClient) { }

    create (title: string, content: string, id: number) {
        return this.http.post<Post>(`${environment.apiUrl}/posts`, { "title": title, "content": content, "userId": id });
    }

    edit (postId: number, title: string, content: string) {
        return this.http.put<Post>(`${environment.apiUrl}/posts`, { "id": postId, "title": title, "content": content });
    }

    delete (postId: number) {
        return this.http.delete<Post>(`${environment.apiUrl}/posts/${postId}`);
    }
}
