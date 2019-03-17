/* Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';


/* Navestock Service */
import {MatchDataService} from '../../matchdata-service/matchdata.service'

/* Navestock Objects */
import {match} from '../../objects/match.object';
import {matchspermonth} from '../../matchpermonth.object'

@Component({
    selector: 'match-list',
    templateUrl: './matchlist-admin.component.html',
    styleUrls: ['../matchlist.component.scss']
})
export class MatchListComponentAdmin implements OnInit {
    public matchList: Observable<match[]>;
    public matchListSeason: Observable<matchspermonth[]>;
    public seasonList: Observable<number[]>;
    public tID: string = null;
    public importSeason: number[] = [];


    constructor(
            private matchdataService: MatchDataService,
            private route: ActivatedRoute,
            private http: HttpClient,
            private iconRegistry: MatIconRegistry, 
            private sanitizer: DomSanitizer
                ) { 
                    iconRegistry.addSvgIcon(
                        'delete',
                        sanitizer.bypassSecurityTrustResourceUrl('./app/icons/baseline-delete-24px.svg'));                      
                        iconRegistry.addSvgIcon(
                            'import_export',
                        sanitizer.bypassSecurityTrustResourceUrl('./app/icons/baseline-import_export-24px.svg'));   
                    }

               

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.tID = params['tid'];
            this.setMatchList((new Date()).getFullYear(), this.tID);
            this.seasonList = this.matchdataService.getSeasons();
        });
        this.importSeason = this.getimportSeason();
    }

    public getimportSeason():number[]{ 
        let ret:number[] = []
        const startYear:number = new Date().getFullYear();
            ret.push(startYear+1);
        for (let index = 0; index < 11; index++) {
            ret.push(startYear-index);
        }
        return ret;
    }

    public setMatchList(seasonYear:number, navTeamId:string):void{
        this.matchListSeason = this.matchdataService.getMatchlistPerMonth(seasonYear, navTeamId);
    }

    /**
     * Call Firebase Function to import List of matches form Play-Cricket.
     * importFunctionMatchList
     */


    onSubmit(f: NgForm) { 
        const frm:any = f.value;
        this.playCricketImport(frm.season);
    }


//Set the match Import seasonID so that the firebase function will trigger and import the list of mathes for a seaon
public playCricketImport(seasonId:string){
    // this.afs.doc('FixtureImport/Import').update({'matchId': matchid});
    console.log('calling HTTP')

    const url = `https://us-central1-navestock-website.cloudfunctions.net/playcricketMatchListImport?season=`+ seasonId;
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }

    this.http.get(url, httpOptions).subscribe( res => console.log(res)) 
}

//Set the match Import matchId so that the firebase function will trigger and import the results
public playCricketMatchDetailImport(matchId:string){
    // this.afs.doc('FixtureImport/Import').update({'matchId': matchid});
    console.log('calling HTTP')

    const url = `https://us-central1-navestock-website.cloudfunctions.net/playcricketMatchDetailImport?mid=`+ matchId;
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }

    this.http.get(url, httpOptions).subscribe(); 
}

}
