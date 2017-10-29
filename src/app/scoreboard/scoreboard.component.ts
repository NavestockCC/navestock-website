import { Component, OnInit, Input } from '@angular/core';
import { FixtureFirebaseDBServices } from '../services/navestock.firebase.db.service';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css'],
  providers: [FixtureFirebaseDBServices],
})
export class ScoreboardComponent implements OnInit {


  public navestockScoreboard: FirebaseObjectObservable<any[]>;

  constructor(private scoreboardService: FixtureFirebaseDBServices) { }

  ngOnInit() {
    this.navestockScoreboard = this.scoreboardService.getNavestockScoreboard();
  }
}
