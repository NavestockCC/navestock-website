import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Component Imports
 */
import {ClubRegistrationComponent} from './clubregistration.component';
import { PlayerRegistrationFormComponent } from './player-registration-form/player-registration-form.component';


const clubRegistrationRoutes: Routes = [
  {
    path: 'club-registration',
    component: ClubRegistrationComponent
  },
  {
    path: 'registrationform',
    component: PlayerRegistrationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(clubRegistrationRoutes)],
  exports: [RouterModule]
})
export class ClubRegistrationRoutingModule { }
