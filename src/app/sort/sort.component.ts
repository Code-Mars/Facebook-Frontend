import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent {
  ss:string="Recent";
  constructor(private post:PostService){}
  ddClick(s:string){
    this.ss=s;
    this.post.setSorting(s);
  }
}
