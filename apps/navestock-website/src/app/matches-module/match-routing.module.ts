import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchListComponent } from './matchlist/matchlist/matchlist.component';
import { MatchDetailComponent } from './match-detail/match-detail/match-detail.component';
import { MatchListComponentAdmin } from './matchlist/matchlist-admin/matchlist-admin.component';
import { MatchDetailComponentAdmin } from './match-detail/match-detail-admin/match-detail-admin.component';

const matchRoutes: Routes = [
  { path: 'matchlist/:tid', component: MatchListComponent},
  { path: 'matchlist-admin/:tid', component: MatchListComponentAdmin}, // match list Admin
  { path: 'matchdetails/:mid', component: MatchDetailComponent},
  { path: 'matchdetails-admin/:mid', component: MatchDetailComponentAdmin} //matchd etail Admin
];

@NgModule({
  imports: [RouterModule.forChild(matchRoutes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
