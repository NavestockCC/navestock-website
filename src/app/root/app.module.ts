/** Anguler Imports */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** AngularFire Imports */
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire//database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, FunctionsRegionToken } from '@angular/fire/functions';

/**Flexlayout import */
import { FlexLayoutModule } from '@angular/flex-layout';

/** Angular Google Maps module */
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

/* Component Imports */
import { AppComponent } from './app.component';
import { AppMenu } from '../menu/menu.component';
import { HomeComponent } from '../home-page/home.component';
import { ContactUsComponent } from '../contact-us/contact-us/contact-us.component';
import { ContactUsAdminComponent } from '../contact-us/contact-us-admin/contact-us-admin.component';
import { BannerComponent } from '../banner/banner.component';
import { FindUsComponent } from '../find-us/find-us.component';
import { PlayersWanted } from '../players-wanted/players-wanted.component';
import { ClubHistoryComponent } from '../club-history/club-history.component';
/**
import{ScoreboardComponent} from '../scoreboard/scoreboard.component';
 */

/* Moddule Import */
import { environment } from '../../environments/environment';
import {NavestockMaterialModule} from './match.material.module';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { MatchModule } from '../matches/match.module';
import {ImgModule} from '../imgModule/imgModule';
import {Navestock250Module} from '../Navestock250/navestock250.module';
import { UserAuthenticationModule } from '../user-authentication/user-authentication.module';
import { NavestockPrivacyStatementComponent } from '../navestock-privacy-statement/navestock-privacy-statement.component';
import { ScoreboardModule } from '../scoreboard/scoreboard.module';
import { PhoneLoginComponent } from '../user-authentication/phone-login/phone-login.component';

/*Service Imports */


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AppMenu,
    HomeComponent,
    ContactUsComponent,
    ContactUsAdminComponent,
    FindUsComponent,
    PlayersWanted,
    ClubHistoryComponent,
    NavestockPrivacyStatementComponent,
    PhoneLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FlexLayoutModule,
    NavestockMaterialModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MatchModule,
    ImgModule,
    Navestock250Module,
    AgmCoreModule.forRoot(environment.googleMapKey),
    UserAuthenticationModule,
    ScoreboardModule
  ],
  providers: [
    { provide: FunctionsRegionToken, useValue: 'us-central1'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }




