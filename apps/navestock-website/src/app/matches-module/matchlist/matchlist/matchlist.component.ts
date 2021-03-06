/* Angular Imports */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

/* Navestock Service */
import {MatchDataService} from '../../matchdata-service/matchdata.service';

/* Navestock Objects */

import {match} from '../../objects/match.object';
import { SeasonList } from '../../objects/season.list.object';
import {MatchsPerMonth} from '../../matchpermonth.object';

@Component({
    selector: 'ncc-app-match-list',
    templateUrl: './matchlist.component.html',
    styleUrls: ['../matchlist.component.scss']
})
export class MatchListComponent implements OnInit {
    public matchList: Observable<match[]>;
    public matchListSeason: Observable<MatchsPerMonth[]>;
    public seasonList: Observable<SeasonList>;
    public tID: string = null;


    constructor(
            private matchdataService: MatchDataService,
            private route: ActivatedRoute,
                ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.tID = params['tid'];
            this.setMatchList((new Date()).getFullYear(), this.tID);
            this.seasonList = this.matchdataService.getSeasons();
        });
    }

    public setMatchList(seasonYear: number, navTeamId: string): void {
        this.matchListSeason = this.matchdataService.getMatchlistPerMonth(seasonYear, navTeamId);
    }

}
