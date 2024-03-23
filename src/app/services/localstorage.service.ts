import { Injectable } from '@angular/core';
import { Profile } from '../DTO/Profile';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  dummy:Profile={
    id:-1,
    username:"",
    fullName:"",
    profilePicture:"",
    bio:"",
    email:"",
    dob:new Date(),
    gender:""
  }

  setData(profile:Profile){
    localStorage.setItem("user",JSON.stringify(profile));
  }
  getData(){
    let s=localStorage.getItem("user");
    if(s==null){
      return this.dummy;
    }
    return JSON.parse(s);
  }
}
