import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { ScoreboardComponent } from './scoreboard.component';
import { NavestockMaterialModule } from '../root/match.material.module';

@NgModule({
  declarations: [
    ScoreboardComponent
  ],
  imports: [
    CommonModule,
    NavestockMaterialModule,
    FormsModule
  ]
})
export class ScoreboardModule { }
