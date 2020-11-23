import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** 
 * Import environment variables 
 */
import { environment } from '../../environments/environment';

/** 
 * External Modules 
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

/** 
 * Angular Modules 
 */
import { ReactiveFormsModule } from '@angular/forms';

/* Navestock Moddule Import */
import { NavestockMaterialModule } from '../app-root-module/match.material.module';

import { ClubInfoRoutingModule } from './club-info-routing.module';
import { ClubHistoryComponent } from './club-history/club-history.component';
import { FindUsComponent } from './find-us/find-us.component';
import { ContactUsComponent } from './contact-us/contact-us/contact-us.component';
import { ContactUsAdminComponent } from './contact-us/contact-us-admin/contact-us-admin.component';



@NgModule({
  declarations: [
    ClubHistoryComponent,
    FindUsComponent,
    ContactUsComponent,
    ContactUsAdminComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapKey.apiKey
    }),
    NavestockMaterialModule,
    ClubInfoRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    ClubHistoryComponent,
    FindUsComponent,
    ContactUsComponent,
    ContactUsAdminComponent
  ]
})
export class ClubInfoModule { }
