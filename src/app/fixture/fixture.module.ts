import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {FixtureWidgetComponent} from './fixture-widget/fixture-widget.component'
import {FixtureListComponent} from './fixture-list/fixture-list.component'
import {FixtureDetailComponent} from './fixture-detail/fixture-detail.component'
import {FixtureImgagesComponent} from "./fixture-images/fixture-images.component";
import {RouterRoutingModule} from '../router/router-routing.module';
import {FixtureDataService} from './fixture-data.service';
import {FixtureFirebaseDBServices} from ".././services/navestock.firebase.db.service";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import {HasBowled} from './has-bowled.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterRoutingModule,
        AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDpCG7lMcZ2RTOvm-ZzN5zeH6SQjj95bc0'
    })
  ],
   exports: [
    FixtureWidgetComponent,
    FixtureListComponent,
    FixtureDetailComponent,
    FixtureImgagesComponent,
  ],
  declarations: [
    FixtureWidgetComponent,
    FixtureListComponent,
    FixtureDetailComponent,
    FixtureImgagesComponent,
    HasBowled
  ],
  providers: [
    FixtureDataService,
    FixtureFirebaseDBServices
  ]
})
export class FixtureModule { }
