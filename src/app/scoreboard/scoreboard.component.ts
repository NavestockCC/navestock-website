import { Component, OnInit } from '@angular/core';
import { ScoreboardService } from './scoreboard.service'
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Scoreboard } from './scoreboard.object';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  scoreboardData:Observable<any>;
  model:any;

  constructor(private scoreboardService: ScoreboardService) { }

  ngOnInit() {
    this.scoreboardData = this.scoreboardService.getScorebard();
    this.scoreboardData.subscribe(
      scoreData => {
        this.model = scoreData;
      }
    )
  }

  onSubmit(f: NgForm) {
    const frm: Scoreboard = f.value;
    this.scoreboardService.setScorebard(frm);
  }

}
