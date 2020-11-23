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
import { GeneratedbdataComponent } from '../firebasedb/generatedbdata/generatedbdata.component';



@NgModule({
  declarations: [
    AppComponent,
    GeneratedbdataComponent
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
    NavestockMaterialModule,
    // Navestock Modules
    AppRoutingModule,
    BannerModule,
    ClubInfoModule,
    HomePageModule,
    Navestock250Module
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
