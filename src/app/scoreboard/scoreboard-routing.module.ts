import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Moddule Import */
import {ScoreboardComponent} from './scoreboard.component';

const scoreboardRoutes: Routes = [
  { path: 'scoreboard', component: ScoreboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(scoreboardRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class ScoreboardRoutingModule { } 
