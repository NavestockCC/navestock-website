/* Angular Modul */
    import { Component, OnInit } from '@angular/core';
    import { Observable } from 'rxjs/Observable';
    import {MediaChange, ObservableMedia} from '@angular/flex-layout';
    import { ActivatedRoute } from '@angular/router';
    import { Location } from '@angular/common';
    import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/* Navestock Cmoponents, Modules & Service */
    import {match} from '../objects/match.object';
    import {innings} from '../objects/innings.object';
    import {batting} from '../objects/batting.object';
    import {bowling} from '../objects/bowling.object';
    import {MatchDataService} from '../matchdata-service/matchdata.service'
    import{BattingComponent} from '../batting/batting.component';

@Component({
    selector: 'match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
    public MatchDetails: Observable<match>;
    public inningsDetails: Observable<innings[]>;
    private mID: string = null;



    constructor(
        private matchdataService: MatchDataService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.getMatchDetails();
     }

    public getMatchDetails(){
        this.mID = this.route.snapshot.paramMap.get('mid');
        this.MatchDetails = this.matchdataService.getMatchDetail(this.mID);
        this.inningsDetails = this.matchdataService.getMatchInningsDetails(this.mID);

    } 


}