import { Component, Input } from '@angular/core';
import { FriendRequestService } from '../services/friend-request.service';
import { UserService } from '../services/user.service';
import { FriendRequest } from '../DTO/FriendRequest';
import { LocalstorageService } from '../services/localstorage.service';
import { Profile } from '../DTO/Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent {
  @Input() height!:number;
  requests:Profile[]=[];
  id:number=this.local.getData().id;
  success:string="";
  flag=true;
  sb(){
    this.flag=!this.flag
  }
  constructor(private frService:FriendRequestService, private userService:UserService, private local:LocalstorageService, private router:Router){

  }
  ngOnInit(){
    this.load();
  }
  load(){
  this.requests=[];
    this.frService.getRequests(this.id).subscribe((res)=>{
      console.log(res);
      for(let i of res){
      this.userService.loadProfile(Number.parseInt(i.sentFrom)).subscribe((user)=>{
        user.id=i.id;
        this.requests.push(user);
      }, (error)=>console.log(error));
      }
    }, (error)=>console.log(error));
  }

  accept(id:number, rq:number){
    let fr=new FriendRequest();
    fr.id=id;
    fr.sentFrom=rq.toString();
    fr.sentTo=this.id.toString();
    this.frService.acceptRequest(fr).subscribe((res)=>{
      this.success=res.message;
      setTimeout(() => {
        this.load();
      }, 500);  
    }, error=>console.log(error));

  }
  decline(id:number){
    this.frService.declineRequest(id).subscribe((res)=>{
      this.success=res.message;
      console.log(this.success);
      setTimeout(() => {
        this.load();
      }, 2000);  
    }, error=>console.log(error));
    
  }
  change(id:number){
    this.userService.setProfile(id);
    this.router.navigate(['/home']);
    
  }
}
