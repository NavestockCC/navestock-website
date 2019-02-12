import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatchListComponent} from '../matches/matchlist/matchlist.component'
import {MatchDetailComponent} from '../matches/match-detail/match-detail.component'

import { HomeComponent } from '../home-page/home.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'matchlist/:tid', component: MatchListComponent},
  { path: 'matchdetails/:mid', component: MatchDetailComponent},

  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

/* FIXME: remove after completion
  { path: 'clubhistory', component: ClubHistoryComponent},
  { path: 'contactus', component: ContactUsComponent},
  { path: 'findus', component: FindUsComponent},
  { path: 'playerswanted', component: PlayersWanted},
  { path: 'scoreboard', component: ScoreboardComponent},
  { path: 'photolist', component: ImgViewerComponent},
  { path: 'photoupload', component: ImgUploadComponent},
  { path: 'galadinner', component: GalaDinnerComponent},
  { path: 'veterans7aside', component: Veterans7asideComponent},
  { path: 'colinbridgevillagecup', component: ColinBridgeVillageCupComponent},
  { path: 'homecomponent250', component: HomeComponent250},
*/

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
