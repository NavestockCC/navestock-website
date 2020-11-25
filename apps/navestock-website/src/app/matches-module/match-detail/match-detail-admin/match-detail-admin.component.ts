/* Angular Modul */
    import { Component, OnInit } from '@angular/core';
    import { Observable } from 'rxjs';
    import { ActivatedRoute } from '@angular/router';


/* Navestock Cmoponents, Modules & Service */
    import {match} from '../../objects/match.object';
    import {innings} from '../../objects/innings.object';
    import {MatchDataService} from '../../matchdata-service/matchdata.service';


@Component({
    selector: 'ncc-app-match-detail',
    templateUrl: './match-detail-admin.component.html',
    styleUrls: ['../match-detail.component.scss']
})
export class MatchDetailComponentAdmin implements OnInit {
    public MatchDetails: Observable<match>;
    public inningsDetails: Observable<innings[]>;
    private mID: string = null;
    public numberofPhotos = 0;



    constructor(
        private matchdataService: MatchDataService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getMatchDetails();
     }

    public getMatchDetails() {
        this.mID = this.route.snapshot.paramMap.get('mid');
        this.MatchDetails = this.matchdataService.getMatchDetail(this.mID);
        this.inningsDetails = this.matchdataService.getMatchInningsDetails(this.mID);
    }

    handlePhotoCounter(nPhotos: number) {
        this.numberofPhotos = nPhotos;
    }

    changeTab(event) {
        console.log(JSON.stringify(event));
      }
}
