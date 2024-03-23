import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private service:UserService, private router:Router){}
    change(){
      this.service.setProfile(-1);
      this.router.navigate(['/home']);
    }
}
