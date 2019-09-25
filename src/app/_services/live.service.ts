import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Post, User } from '../_models';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private destroyed: Subject<void> = new Subject();
  private followedIds: number[] = [];
  private userId: number;
  private hub: HubConnection = new HubConnectionBuilder()
    .withUrl(`${environment.baseUrl}/hub`)
    .build();

  public start (userId: number) {
    this.hub
      .start()
      .then(() => {
        console.log('Connected for live updates');
        this.userId = userId;
        this.hub.invoke('AddToGroup', userId.toString());
        this.data.followed.pipe(takeUntil(this.destroyed))
          .subscribe(
            followed => {
              const ids = (followed && followed.map(u => u.Id)) || [];

              if (ids) {
                ids.filter(id => !this.followedIds.includes(id))
                  .forEach(id => {
                    this.hub.invoke('AddToGroup', id.toString());
                  });
              }

              if (this.followedIds) {
                this.followedIds.filter(id => !ids.includes(id))
                  .forEach(id => {
                    this.hub.invoke('RemoveFromGroup', id.toString());
                  });
              }

              this.followedIds = ids;
            }
          );
      })
      .catch(err => console.log('Failed to connect to live updates', err));
  }

  public stop () {
    this.destroyed.next();
    this.destroyed.complete();
    this.hub
      .stop();
  }

  constructor (
    private data: DataService,
  ) {
    this.hub.on('newpostcreated', (post: Post) => {
      this.data.addPost(post);
    });
    this.hub.on('postedited', (post: Post) => {
      this.data.updatePost(post);
    });
    this.hub.on('postdeleted', (postId: number) => {
      this.data.removePost(postId);
    });
  }
}
