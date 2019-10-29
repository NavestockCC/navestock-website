import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Module Imports
 */
import { ClubRegistrationRoutingModule } from './club-registration-routing.module';
import { ClubMaterialModule } from './club.material.module';


/**
 * Component Imports
 */
import { ClubRegistrationComponent } from './clubregistration.component';
import { PlayerRegistrationFormComponent } from './player-registration-form/player-registration-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClubRegistrationComponent,
    PlayerRegistrationFormComponent
  ],
  imports: [
    CommonModule,
    ClubMaterialModule,
    ClubRegistrationRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClubRegistrationModule { }
