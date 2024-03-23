import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocalstorageService } from '../services/localstorage.service';
import { FriendService } from '../services/friend.service';
import { Profile } from '../DTO/Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent {
  @Input() height!:number;
  friends!:Profile[];
  id:number=this.local.getData().id;
  constructor(private frService:FriendService, private userService:UserService, private local:LocalstorageService, private router:Router){

  }
  ngOnInit(){
    this.load();
  }
  load(){
    this.friends=[];
      this.frService.getFriendList(this.id).subscribe((res)=>{
        for(let i of res){
        this.userService.loadProfile(i).subscribe((user)=>{
          this.friends.push(user);
        }, (error)=>console.log(error));
        }
      }, (error)=>console.log(error));
    }
    change(id:number){
      this.userService.setProfile(id);
      this.router.navigate(['/home']);
    }
    flag=true;
    sb(){
      this.flag=!this.flag
    }
}
