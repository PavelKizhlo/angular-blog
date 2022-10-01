import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FbCreateResponse, Post } from './interfaces';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbURL}/posts.json`, post).pipe(
      map((response: FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date),
        };
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>(`${environment.fbDbURL}/posts.json`)
      .pipe(
        map((response: { [key: string]: Post }) => {
          return Object.keys(response).map((key) => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          }));
        })
      );
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbURL}/posts/${id}.json`);
  }
}
