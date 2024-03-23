import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Post } from '../DTO/Post';
import { Profile } from '../DTO/Profile';
import { LocalstorageService } from '../services/localstorage.service';
import { Image } from '../DTO/Image';
import { Response } from '../DTO/Response';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  success!:string;
  error!:string;
  file!:File;
  url!:string;
  caption!:string;
  privacy:string="Public";
  user!:Profile;
  image=false;
  video=false;
  constructor(private http:HttpClient, private local:LocalstorageService){}

  ngOnInit(){
    this.user=this.local.getData();
  }

  createPost(){
    let post=new Post();
    post.postText=this.caption;
    post.userId=this.user.id;
    post.postedBy=this.user.username;
    post.privacy=this.privacy.toUpperCase();
    post.postImage=this.url;
    post.sharedFrom=this.user.fullName;
    console.log(post);
    this.http.post<Response>("http://localhost:9200/posts/create", post).subscribe((res)=>this.success=res.message,(error)=>this.error="Some error occurred Try later!");
    setTimeout(() => {
      this.error="";
      this.success="";
      this.caption="";
      this.url="";
      this.image=false;
      this.video=false;
      this.privacy="Public";
    }, 3000);
  }

  submit(){
    let url="http://localhost:9300/data";
    let data:FormData=new FormData();
    data.append('file', this.file);
    this.http.post<Image>(url, data).subscribe(
      (res)=>{
        this.url=res.id;
        console.log(this.url);
      },
      (err)=>console.log(err)
    );
  }
  onChange(event :any){
    if(event.target.files.length){
      this.file=event.target.files[0];
      if(event.target.id=="image")this.image=true;
      else this.video=true;
      this.submit();
    }
  }

  ddClick(id:string){
    this.privacy=id;
  }

}
