import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatchListComponent} from '../matches/matchlist/matchlist/matchlist.component'
import {MatchDetailComponent} from '../matches/match-detail/match-detail/match-detail.component'
import {ContactUsComponent} from '../contact-us/contact-us/contact-us.component';
import {UserAuthenticationComponent} from '../user-authentication/user-authentication/user-authentication.component';
import {GalaDinnerComponent} from '../Navestock250/gala-dinner/gala-dinner.component';
import {Veterans7asideComponent} from '../Navestock250/veterans7aside/veterans7aside.component';
import {ColinBridgeVillageCupComponent} from '../Navestock250/colin-bridge-village-cup/colin-bridge-village-cup.component';
import {HomeComponent250} from '../Navestock250/home-page/home250.component';
import {FindUsComponent} from '../find-us/find-us.component';
import {HomeComponent} from '../home-page/home.component';
import {PlayersWanted} from '../players-wanted/players-wanted.component';
import {ClubHistoryComponent} from '../club-history/club-history.component';

/** Navestock Admin Components */
import {ContactUsAdminComponent} from '../contact-us/contact-us-admin/contact-us-admin.component';
import {MatchListComponentAdmin} from "../matches/matchlist/matchlist-admin/matchlist-admin.component";
import {MatchDetailComponentAdmin} from "../matches/match-detail/match-detail-admin/match-detail-admin.component";

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'matchlist/:tid', component: MatchListComponent},
  { path: 'matchlist-admin/:tid', component: MatchListComponentAdmin}, // matchlist Admin
  { path: 'matchdetails/:mid', component: MatchDetailComponent},
  { path: 'matchdetails-admin/:mid', component: MatchDetailComponentAdmin},
  { path: 'contactus', component: ContactUsComponent},
  { path: 'contactus-admin', component: ContactUsAdminComponent}, // constactus Admin
  { path: 'auth', component: UserAuthenticationComponent},
  { path: 'galadinner', component: GalaDinnerComponent},
  { path: 'veterans7aside', component: Veterans7asideComponent},
  { path: 'colinbridgevillagecup', component: ColinBridgeVillageCupComponent},
  { path: 'homecomponent250', component: HomeComponent250},
  { path: 'findus', component: FindUsComponent},
  { path: 'playerswanted', component: PlayersWanted},
  { path: 'clubhistory', component: ClubHistoryComponent},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

/* FIXME: remove after completion


  
  { path: 'scoreboard', component: ScoreboardComponent},
  { path: 'photolist', component: ImgViewerComponent},
  { path: 'photoupload', component: ImgUploadComponent},

*/

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
