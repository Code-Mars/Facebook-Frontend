import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { LocalstorageService } from '../services/localstorage.service';
import { Post } from '../DTO/Post';
import { Like } from '../DTO/Like';
import { Profile } from '../DTO/Profile';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Comment } from '../DTO/Comment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent {
  parseHashtags(content: string) {
    return content.replace(/#(\w+)/g, '<span class="text-primary">#$1</span>');
  }
  id: number = this.local.getData().id;
  feedId!: number;
  s!: string;
  posts!: Post[];
  comment!: Boolean[];
  edit!:Boolean[];
  map = new Map<number, Profile>();
  constructor(
    private postService: PostService,
    private local: LocalstorageService,
    private userService: UserService, 
    private router:Router
  ) {}
  ngOnInit() {
    this.userService.getAllProfiles().subscribe((res) => {
      for (let r of res) this.map.set(r.id, r);
      console.log(res);
    });
    this.userService.profObservable$.subscribe(
      (prof) => {
        this.feedId = prof;
        this.postService.sortingObservable$.subscribe(
          (res) => {
            this.s = res;
            this.load();
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }
  load() {
    if (this.feedId == -1) {
      this.postService.getFeed(this.id, this.s).subscribe(
        (res) => {
          this.comment = new Array(res.length).fill(false);
          this.posts = res;
          this.edit=new Array(res.length).fill(false);
        },
        (error) => console.log(error)
      );
    }
    else if(this.feedId==this.id){
      this.postService.getUserPosts(this.id, this.s).subscribe(
        (res) => {
          this.comment = new Array(res.length).fill(false);
          this.posts = res;
          this.edit=new Array(res.length).fill(false);
        },
        (error) => console.log(error)
      );
    }
    else {
      this.postService.getFriendPosts(this.id,this.feedId, this.s).subscribe(
        (res) => {
          this.comment = new Array(res.length).fill(false);
          this.posts = res;
          this.edit=new Array(res.length).fill(false);
        },
        (error) => console.log(error)
      );
    }
  }
  like(index: number, postId: number) {
    this.posts[index].hasLiked = !this.posts[index].hasLiked;
    if (!this.posts[index].likes) this.posts[index].likes = [];
    if (this.posts[index].likes.find((value) => value == this.id))
      this.posts[index].likes = this.posts[index].likes.filter(
        (value) => value != this.id
      );
    else this.posts[index].likes.push(this.id);
    let like: Like = new Like();
    like.id = this.id;
    like.postId = postId;
    this.postService.likePost(like).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => console.log(error)
    );
  }
  getTimeDifference(date: Date): string {
    // console.log(date);
    const now = new Date();
    const timeDifference =
      now.valueOf() - Date.parse(date.toString()).valueOf();

    if (timeDifference < 60000) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    } else if (timeDifference < 3600000) {
      const minutes = Math.floor(timeDifference / 60000);
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else if (timeDifference < 86400000) {
      const hours = Math.floor(timeDifference / 3600000);
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      const days = Math.floor(timeDifference / 86400000);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
  }

  toggleComment(id: number) {
    this.comment[id] = !this.comment[id];
  }
  hover(event: any) {
    if (event.target.className == 'bi bi-heart fw-bold')
      event.target.className = 'bi bi-heart-fill text-danger fw-bold';
    else event.target.className = 'bi bi-heart fw-bold';
  }
  commentText = '';
  added = true;
  addComment(postId: number, index: number) {
    this.added = false;
    let commentDTO: Comment = new Comment();
    commentDTO.timeStamp = new Date();
    commentDTO.commentText = this.commentText;
    commentDTO.commentedBy = this.id;
    if (this.posts[index].comments == null) this.posts[index].comments = [];
    this.posts[index].comments.push(commentDTO);
    this.commentText = '';
    this.postService.addComment(postId, commentDTO).subscribe(
      (res) => {
        console.log(res);
        setTimeout(() => {
          this.added = true;
        }, 2000);
      },
      (error) => console.log(error)
    );
  }
  change(id:number){
    this.userService.setProfile(id);
    this.router.navigate(['/home']);
  }
  editPost(index:number){
    this.edit[index]=!this.edit[index];
  }
  deletePost(id:number){
    this.postService.deletePost(id).subscribe((res)=>{console.log(res);this.load();}, (error)=>console.log(error));
    
  }
  savePost(index:number){
    console.log(this.posts[index]);
    this.edit[index]=!this.edit[index];
    this.postService.updatePost(this.posts[index]).subscribe((res)=>console.log(res), (error)=>console.log(error));
  }
}
