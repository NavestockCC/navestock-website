import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

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
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { FixtureModule }  from '../fixture/fixture.module';
import { environment } from '../../environments/environment';



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
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot(environment.googleMapKey)
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }




