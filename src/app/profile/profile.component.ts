import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Profile } from '../DTO/Profile';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile!:Profile;
  constructor(public service:UserService, private router:Router, private local:LocalstorageService){}
  ngOnInit(){
    this.profile=this.local.getData();
  }
  change(id:number){
    this.service.setProfile(id);
  }
}
