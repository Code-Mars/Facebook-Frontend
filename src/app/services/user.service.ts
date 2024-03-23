import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../DTO/Profile';
import { HttpClient } from '@angular/common/http';
import { User } from '../DTO/User';
import { Response } from '../DTO/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile!:Profile;
  private prof$ = new BehaviorSubject<number>(-1);
  
  profObservable$ = this.prof$.asObservable();
  
  setProfile(value: number) {
    this.prof$.next(value);
  }
  constructor(private http:HttpClient) { }
  ngOnInit(){
  }
  createUser(user:any):Observable<User>{
    return this.http.post<User>("http://localhost:9100/users/register", user);
  }
  loginUser(user:any):Observable<number>{
    return this.http.post<number>("http://localhost:9100/users/login", user);
  }
  loadProfile(id:any):Observable<Profile>{
    return this.http.post<Profile>("http://localhost:9100/users/get", id);
  }
  updateProfile(data:any):Observable<Response>{
    return this.http.post<Response>("http://localhost:9100/users/update", data);
  }
  getSuggestions(id:any):Observable<Profile[]>{
    return this.http.post<Profile[]>("http://localhost:9100/users/suggestions", id);
  }
  getAllProfiles():Observable<Profile[]>{
    return this.http.post<Profile[]>("http://localhost:9100/users/getAll", 0);
  }
  resetPassword(data:any):Observable<any>{
    return this.http.post<any>("http://localhost:9100/users/resetPassword", data);
  }
}
