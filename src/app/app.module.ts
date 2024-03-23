import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActivityComponent } from './activity/activity.component';
import { FeedComponent } from './feed/feed.component';
import { FfComponent } from './ff/ff.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { ReqComponent } from './req/req.component';
import { SortComponent } from './sort/sort.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { UpdateComponent } from './update/update.component';
import { HoverClassDirective } from './hover-class.directive';
import { FriendsComponent } from './friends/friends.component';

@NgModule({
  declarations: [
    AppComponent,
    ActivityComponent,
    FeedComponent,
    FfComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    PostComponent,
    ProfileComponent,
    ReqComponent,
    SortComponent,
    SuggestionComponent,
    UpdateComponent,
    HoverClassDirective,
    FriendsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
