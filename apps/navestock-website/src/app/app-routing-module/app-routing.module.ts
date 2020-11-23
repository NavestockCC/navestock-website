import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/** 
 * Navestock Routing Components
 */


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(nccRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
