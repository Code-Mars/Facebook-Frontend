import { Component } from '@angular/core';
import { Profile } from '../DTO/Profile';
import { UserService } from '../services/user.service';
import { LocalstorageService } from '../services/localstorage.service';
import { HttpClient } from '@angular/common/http';
import { Image } from '../DTO/Image';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  
  file!:File;
  id=this.local.getData().id;
  show=false;
  canEdit=false;
  showId!:number;
  message!:string;
  save=false;
  map= new Map<number, Profile>();
  constructor(private userService:UserService, private local:LocalstorageService, private http:HttpClient){}
  ngOnInit(){
    this.userService.getAllProfiles().subscribe((res)=>{
      for(let r of res)this.map.set(r.id, r);
      this.reset();
    })
    this.userService.profObservable$.subscribe((res)=>{
      this.showId=res;
      this.reset();

      this.scroll(document.getElementById('upp')||new HTMLElement);
    }, error=>console.log(error));
}
scroll(e1:HTMLElement){
  e1.scrollIntoView({behavior:"smooth"});
}
  reset(){
    this.bio=this.map.get(this.showId)?.bio||"Software Engineer | Google";
    this.dob=this.map.get(this.showId)?.dob||new Date();
    this.email=this.map.get(this.showId)?.email||"abc@xyz.com";
    this.gender=this.map.get(this.showId)?.gender||"MALE";
    this.canEdit=false;
      this.show=false;
      this.save=false;
      this.message="";
  }
  change(){
    this.show=!this.show;
  }
  edit(){
    this.canEdit=true;
    this.save=true;
  }
  dob!:Date;
  email!:string;
  gender!:string;
  bio!:string;
  update(){
    this.message="Changes saved Successfully";
    this.canEdit=false;
    let p:Profile=this.map.get(this.id) || new Profile();
    p.bio=this.bio;
    p.dob=this.dob;
    p.email=this.email;
    p.gender=this.gender;
    this.userService.updateProfile(p).subscribe((res)=>console.log(res), error=>console.log(error));
    setTimeout(() => {
      this.reset();
    }, 3000);
  }
  back(){
    this.userService.setProfile(-1);
  }
  onChange(event :any){
    if(event.target.files.length){
      this.file=event.target.files[0];
      this.editImage();
    }
  }
  editImage(){
    let url="http://localhost:9300/data";
    let data:FormData=new FormData();
    data.append('file', this.file);
    this.http.post<Image>(url, data).subscribe(
      (res)=>{
        console.log(res);
        let p:Profile=this.map.get(this.id)||new Profile();
        p.profilePicture=res.id;
        this.map.set(this.id, p);
        this.userService.updateProfile(p).subscribe((res)=>console.log(res));
      },
      (err)=>console.log(err)
    );
  }
}
