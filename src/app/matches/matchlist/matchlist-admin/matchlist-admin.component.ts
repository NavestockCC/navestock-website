/* Angular Imports */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


/* Navestock Service */
import { MatchDataService } from '../../matchdata-service/matchdata.service';
import { UserAuthenticationService } from '../../../user-authentication/user-authentication-service/user-authentication.service';

/* Navestock Objects */
import { match } from '../../objects/match.object';
import { MatchsPerMonth } from '../../matchpermonth.object';


@Component({
    selector: 'match-list',
    templateUrl: './matchlist-admin.component.html',
    styleUrls: ['../matchlist.component.scss']
})

export class MatchListComponentAdmin implements OnInit {
    public matchList: Observable<match[]>;
    public matchListSeason: Observable<MatchsPerMonth[]>;
    public seasonList: Observable<number[]>;
    public tID: string = null;
    public importSeason: number[] = [];
    public userAuth: Observable<firebase.User> = null;
    public loading: boolean = false;


    constructor(
        private matchdataService: MatchDataService,
        private route: ActivatedRoute,
        private http: HttpClient,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        private UAS: UserAuthenticationService
    ) {
        iconRegistry.addSvgIcon(
            'delete',
            sanitizer.bypassSecurityTrustResourceUrl('./app/icons/baseline-delete-24px.svg'));
        iconRegistry.addSvgIcon(
            'import_export',
            sanitizer.bypassSecurityTrustResourceUrl('./app/icons/baseline-import_export-24px.svg'));

    /**
    * Initialise the user authentication service
    * This will be used to check if the user is authenticated before allowing admin functions
    */
        this.userAuth = this.UAS.getUserAuth();
    }



    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.tID = params['tid'];
            this.setMatchList((new Date()).getFullYear(), this.tID);
            this.seasonList = this.matchdataService.getSeasons();
        });
        this.importSeason = this.getimportSeason();
    }

    public getimportSeason(): number[] {
        const ret: number[] = [];
        const startYear: number = new Date().getFullYear();
        ret.push(startYear + 1);
        for (let index = 0; index < 11; index++) {
            ret.push(startYear - index);
        }
        return ret;
    }

    public setMatchList(seasonYear: number, navTeamId: string): void {
        this.matchListSeason = this.matchdataService.getMatchlistPerMonth(seasonYear, navTeamId);
    }

    /**
     * Call Firebase Function to import List of matches form Play-Cricket.
     * importFunctionMatchList
     */


    onSubmit(f: NgForm) {
        const frm: any = f.value;
        this.playCricketImport(frm.season);
    }


    // Set the match Import seasonID so that the firebase function will trigger and import the list of mathes for a seaon
    public playCricketImport(seasonId: string) {
        // this.afs.doc('FixtureImport/Import').update({'matchId': matchid});
        console.log('calling HTTP');

        const url = `https://us-central1-navestock-website.cloudfunctions.net/playcricketMatchListImports?season=` + seasonId;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        this.http.get(url, httpOptions).subscribe(res => console.log(res));
    }

    public playCricketMatchDetailImport(matchId: string) {
        // this.afs.doc('FixtureImport/Import').update({'matchId': matchid});
        console.log('calling HTTP');

        const url = `https://us-central1-navestock-website.cloudfunctions.net/playcricketMatchDetailImport?mid=` + matchId;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        const request = this.http.get(url, httpOptions)
        .pipe(
            share()
        );
        this.setLoadingSpinner(request);
    }

    setLoadingSpinner(spinnerObservable: Observable<any>) {
        this.loading = true;
        spinnerObservable.subscribe(
            () => {this.loading = false; }
        );
    }


}
