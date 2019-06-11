import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Scoreboard } from './scoreboard.object';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Function to get Scoreboard data from the Firebase Realtime Database.
   * @returns Observable of type Scoreboard
   */
  public getScorebard():Observable<Scoreboard> {
    return this.db.object<Scoreboard>('Navestock_Scoreboard').valueChanges();
  }

  /**
   * Method to updateScoreboard data
   */
  public setScorebard(sb:Scoreboard):void {
    const scoreboardRef = this.db.object('Navestock_Scoreboard');
    scoreboardRef.update(sb);
  }
}
