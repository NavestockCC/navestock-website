import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** 
 * Navestock Routing Components
 */
import { GCPIdentityComponent } from '../gcpidentity/gcpidentity.component';

const nccRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('../home-page-module/home-page-routing.module').then(mod => mod.HomePageRoutingModule)
  },
  {
    path: 'club',
    loadChildren: () => import('../club-info-module/club-info-routing.module').then(mod => mod.ClubInfoRoutingModule)
  },
  {
    path: 'ncc250',
    loadChildren: () => import('../navestock250-module/navestock250-routing.module').then(mod => mod.Navestock250RoutingModule)
  },
  {
    path: 'honoursboard',
    loadChildren: () => import('../honoursboard-module/honoursboard-routing.module').then(mod => mod.HonoursboardRoutingModule)
  },
  {
    path: 'match',
    loadChildren: () => import('../matches-module/match-routing.module').then(mod => mod.MatchRoutingModule)
  },
  { 
    path: 'google67cec1e0b4652e94', 
    component: GCPIdentityComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(nccRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
