import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app-root-component/app.component';

/** 
 * Import environment variables 
 */
import { environment } from '../../environments/environment';

/** 
 * External Modules 
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AgmCoreModule } from '@agm/core';

/**
 * Navestock Modules
 */
import { NavestockMaterialModule } from './match.material.module';
import { AppRoutingModule } from '../app-routing-module/app-routing.module';
import { BannerModule } from '../banner-module/banner.module';
import { ClubInfoModule } from '../club-info-module/club-info.module';
import { HomePageModule } from '../home-page-module/home-page.module';
import { Navestock250Module } from '../navestock250-module/navestock250.module';
import { HonoursboardModule } from '../honoursboard-module/honoursboard.module';
import { MatchModule } from '../matches-module/match.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapKey.apiKey
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NavestockMaterialModule,
    // Navestock Modules
    AppRoutingModule,
    BannerModule,
    ClubInfoModule,
    HomePageModule,
    Navestock250Module,
    HonoursboardModule,
    MatchModule
  ],
  providers: [
    {
      provide: SETTINGS,
      useValue: environment.stage === 'emulator' ?{
        host: 'localhost:8080',
        ssl: false
      } : undefined
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
