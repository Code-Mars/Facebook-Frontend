import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showId!:number;
  constructor(private service:UserService, private router:Router, private local:LocalstorageService){}
  ngOnInit(){
    if(this.local.getData().id==-1)this.router.navigate(['/login']);
    this.service.profObservable$.subscribe(res=>this.showId=res);
  }
}
