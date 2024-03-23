import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../DTO/Post';
import { HttpClient } from '@angular/common/http';
import { Like } from '../DTO/Like';
import { Comment } from '../DTO/Comment';
import { Response } from '../DTO/Response';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private sorting$ = new BehaviorSubject<string>("Recent");
  
  sortingObservable$ = this.sorting$.asObservable();
  
  setSorting(value: string) {
    this.sorting$.next(value);
  }
  constructor(private http:HttpClient) { }
  createUser(post:any):Observable<Response>{
    return this.http.post<Response>("http://localhost:4000/posts/create", post);
  }
  getFeed(id:any, s:any):Observable<Post[]>{
    return this.http.post<Post[]>("http://localhost:4000/posts/recent/"+id, s);
  }
  likePost(like:Like):Observable<Response>{
    return this.http.post<Response>("http://localhost:4000/posts/like", like);
  }
  addComment(id:number, comment:Comment):Observable<Response>{
    return this.http.post<Response>("http://localhost:4000/posts/comment/"+id, comment);
  }
  getUserPosts(id:any, s:any):Observable<Post[]>{
    return this.http.post<Post[]>("http://localhost:4000/posts/myposts/"+id, s);
  }
  getFriendPosts(id:any,friendId:any, s:any):Observable<Post[]>{
    return this.http.post<Post[]>("http://localhost:4000/posts/friendposts/"+friendId+"/"+id, s);
  }
  updatePost(post:any){
    return this.http.post<Response>("http://localhost:4000/posts/update", post);
  }
  deletePost(id:number){
    return this.http.post<Response>("http://localhost:4000/posts/delete", id);
  }
}
