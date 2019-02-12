import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireDatabaseModule } from '@angular/fire//database';
// import { AgmCoreModule, MapsAPILoader } from '@agm/core'; //MapsAPILoader


/* Component Imports */
import { AppComponent } from './app.component';
import { AppMenu } from '../menu/menu.component';
import { HomeComponent } from '../home-page/home.component';
/**
import { ClubHistoryComponent } from '../club-history/club-history.component';
import { PlayersWanted } from '../players-wanted/players-wanted.component';
import{ScoreboardComponent} from '../scoreboard/scoreboard.component';
 */

/* Moddule Import */
import { environment } from '../../environments/environment';
import {NavestockMaterialModule} from './match.material.module';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { TestHomeComponent } from '../test-home/test-home.component';
import { BannerComponent } from '../banner/banner.component';
import { MatchModule } from '../matches/match.module';
import { ContactUsComponent } from '../contact-us/contact-us.component';
/**
import {RouterRoutingModule} from '../router/router-routing.module';

import { FindUsComponent } from '../find-us/find-us.component';


import {ImgModule} from '../imgModule/imgModule';
import {Navestock250Module} from '../Navestock250/navestock250.module'
*/

/*Service Imports */





@NgModule({
  declarations: [
    AppComponent,
    TestHomeComponent,
    BannerComponent,
    AppMenu,
    HomeComponent,
    ContactUsComponent 
   /**
    ClubHistoryComponent,
   
    FindUsComponent,
    PlayersWanted,
    ScoreboardComponent
     */
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FlexLayoutModule,
    NavestockMaterialModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    MatchModule,
   // AgmCoreModule.forRoot(environment.googleMapKey),
    /**
    
    RouterRoutingModule,
    ,
    
    ImgModule,
    Navestock250Module 
    */
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }




