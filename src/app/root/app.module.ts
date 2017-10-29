import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

/* Component Imports */
import { AppComponent } from './app.component';
import { AppMenu } from '../menu/menu.component';
import { HomeComponent } from '../home-page/home.component';
import { ClubHistoryComponent } from '../club-history/club-history.component';
import { TeamsComponent } from '../teams/teams.component';
import { PlayersWanted } from '../players-wanted/players-wanted.component';
import{ScoreboardComponent} from '../scoreboard/scoreboard.component';

/* Moddule Import */
import {RouterRoutingModule} from '../router/router-routing.module';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { FindUsComponent } from '../find-us/find-us.component';
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import { FixtureModule }  from '../fixture/fixture.module'


// Must export the config
const firebaseConfig = {
    apiKey: 'AIzaSyCZoGqv8DGcrtw1byi4XG_cNP50dTVohd8',
    authDomain: 'navestock-website.firebaseapp.com',
    databaseURL: 'https://navestock-website.firebaseio.com',
    projectId: 'navestock-website',
    storageBucket: 'navestock-website.appspot.com',
    messagingSenderId: "394030533382"
};



@NgModule({
  declarations: [
    AppComponent,
    AppMenu,
    HomeComponent,
    ClubHistoryComponent,
    ContactUsComponent,
    FindUsComponent,
    TeamsComponent,
    PlayersWanted,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterRoutingModule,
    FixtureModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpCG7lMcZ2RTOvm-ZzN5zeH6SQjj95bc0'
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }




