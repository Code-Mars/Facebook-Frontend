import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';
import { UserService } from '../services/user.service';
import { Profile } from '../DTO/Profile';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  profile!:Profile;
  constructor(private router:Router, private local:LocalstorageService, private service:UserService){}
  ngOnInit(){
    this.profile=this.local.getData();
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  change(id:number){
    this.service.setProfile(id);
    this.router.navigate(['/home']);
  }
}
