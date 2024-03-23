import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendRequest } from '../DTO/FriendRequest';
import { Response } from '../DTO/Response';

@Injectable({
  providedIn: 'root'
})
export class FriendRequestService {

  constructor(private http:HttpClient) { }
  sendRequest(fr:any):Observable<Response>{
    return this.http.post<Response>("http://localhost:9400/requests/send", fr);
  }
  getRequests(fr:any):Observable<FriendRequest[]>{
    return this.http.post<FriendRequest[]>("http://localhost:9400/requests/sentTo/"+fr, "0");
  }
  acceptRequest(fr:any):Observable<Response>{
    return this.http.post<Response>("http://localhost:9400/requests/accept", fr);
  }
  declineRequest(fr:any):Observable<Response>{
    return this.http.post<Response>("http://localhost:9400/requests/decline/"+fr, "0");
  }
}
