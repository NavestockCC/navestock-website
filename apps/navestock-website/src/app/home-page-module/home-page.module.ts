import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 
 * External Modules 
 */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Navestock Moddule Import */
import { NavestockMaterialModule } from '../app-root-module/match.material.module';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomeComponent } from './home-page/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NavestockMaterialModule,
    HomePageRoutingModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomePageModule { }
