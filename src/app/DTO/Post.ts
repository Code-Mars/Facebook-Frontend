import { Comment } from "./Comment";

export class Post {
    id!: number;
    userId!: number;
    postedBy!: string;
    postText!: string;
    postImage!: string;
    postVideo!: string;
    timestamp!: Date; 
    privacy!: string 
    likes!: number[]; 
    comments!: Comment[]; 
    sharedFrom!: string;
    hasLiked!:boolean;
  }