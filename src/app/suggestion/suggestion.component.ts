import { Component } from '@angular/core';
import { Profile } from '../DTO/Profile';
import { UserService } from '../services/user.service';
import { LocalstorageService } from '../services/localstorage.service';
import { FriendRequestService } from '../services/friend-request.service';
import { FriendRequest } from '../DTO/FriendRequest';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent {
  suggest!: Profile[];
  success = false;
  flag = true;
  sb() {
    this.flag = !this.flag
  }
  profile!: Profile;
  constructor(private service: UserService, private local: LocalstorageService, private frService: FriendRequestService) { }
  ngOnInit() {
    this.profile = this.local.getData();
    this.loadData();
  }
  loadData() {
    this.flag = true;
    this.clicked = false;
    this.service.getSuggestions(this.profile.id).subscribe((res) => {
      this.suggest = res;
    }, (error) => console.log(error));
  }
  clicked = false;
  addFriend(id: number, event: any) {
    let fr = new FriendRequest();
    fr.sentFrom = this.profile.id.toString();
    fr.sentTo = id.toString();
    event.target.className = "bi bi-check-all text-success";
    this.clicked = true;
    this.frService.sendRequest(fr).subscribe((res) => {
      this.success = true;
      console.log(this.success);
    }, (error) => console.log(error))
    setTimeout(() => {
      this.loadData();
    }, 2000);
  }
  hover(event: any) {
    if (this.clicked) return;
    event.target.className = "bi bi-person-plus-fill text-primary";
  }
  out(event: any) {
    if (this.clicked) return;
    event.target.className = "bi bi-person-plus text-primary"
  }
  change(id: number) {
    this.service.setProfile(id);
  }
}
