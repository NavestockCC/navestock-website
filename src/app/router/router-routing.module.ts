import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from '../home-page/home.component';
import { ClubHistoryComponent} from '../club-history/club-history.component';
import {ContactUsComponent} from '../contact-us/contact-us.component';
import {FindUsComponent} from '../find-us/find-us.component';
import {TeamsComponent} from '../teams/teams.component';
import {FixtureDetailComponent} from '../fixture/fixture-detail/fixture-detail.component';
import {PlayersWanted} from '../players-wanted/players-wanted.component';
import {ScoreboardComponent} from '../scoreboard/scoreboard.component';



/* Route Definitaions */
const appRoutes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'clubhistory', component: ClubHistoryComponent},
  { path: 'contactus', component: ContactUsComponent},
  { path: 'findus', component: FindUsComponent},
  { path: 'teams/:tmid', component: TeamsComponent},
  { path: 'fixturedetail/:fid', component: FixtureDetailComponent},
  { path: 'playerswanted', component: PlayersWanted},
  { path: 'scoreboard', component: ScoreboardComponent},

  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RouterRoutingModule { }
