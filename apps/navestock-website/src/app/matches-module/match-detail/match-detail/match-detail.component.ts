/* Angular Modul */
    import { Component, OnInit } from '@angular/core';
    import { Observable } from 'rxjs';
    import { ActivatedRoute } from '@angular/router';
    import { FormControl } from '@angular/forms';

/* Navestock Cmoponents, Modules & Service */
    import {match} from '../../objects/match.object';
    import {innings} from '../../objects/innings.object';
    import {MatchDataService} from '../../matchdata-service/matchdata.service'



@Component({
    selector: 'ncc-app-match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['../match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
    public MatchDetails: Observable<match>;
    public inningsDetails: Observable<innings[]>;
    private mID: string = null;
    public numberofPhotos = 0;
    public SelectedIndex = new FormControl(0);


    constructor(
        private matchdataService: MatchDataService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.getMatchDetails();
        this.SelectedIndex.setValue(1);
     }

    public getMatchDetails(){
        this.mID = this.route.snapshot.paramMap.get('mid');
        this.MatchDetails = this.matchdataService.getMatchDetail(this.mID);
        this.inningsDetails = this.matchdataService.getMatchInningsDetails(this.mID);
    }

    handlePhotoCounter(nPhotos:number){
        this.numberofPhotos = nPhotos;
    }
}
