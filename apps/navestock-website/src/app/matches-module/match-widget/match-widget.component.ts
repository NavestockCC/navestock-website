import { Component, OnInit} from '@angular/core';
import {MatchDataService} from '../matchdata-service/matchdata.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';



import {FixtureFirebaseDBServices} from '../services/navestock.firebase.db.service';

/** Navestock Objects */
import {navestockTeam} from '../objects/navestock-teams.objects';
import {match} from '../objects/match.object';


@Component({
  selector: 'ncc-app-matchwidget',
  templateUrl: './match-widget.component.html',
  styleUrls: ['./match-widget.component.scss']
})
export class MatchWidgetComponent implements OnInit {
  private NaveStockTeams: Observable<navestockTeam[]>;

  public matchWidgetData: Observable<match[]>;


  errorMessage: string;


  constructor(
    private matchWidgetDataService: MatchDataService,
    private teamsDataServiec: FixtureFirebaseDBServices,
    private route: ActivatedRoute) {
       this.NaveStockTeams = this.teamsDataServiec.getNavestockTeams(true, false);
    }

    ngOnInit(): void {
      this.matchWidgetData = this.matchWidgetDataService.getmatchWidgetData(9);
    }
}
