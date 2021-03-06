import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { match } from '../objects/match.object';
import { SeasonList } from '../objects/season.list.object';
import { MatchsPerMonth } from '../matchpermonth.object';
import { innings } from '../objects/innings.object';
import { batting } from '../objects/batting.object';
import { bowling } from '../objects/bowling.object';
import { navestockTeam } from '../objects/navestock-teams.objects';



@Injectable({
    providedIn: 'root'
})
export class MatchDataService {

    private matchesCollection: AngularFirestoreCollection<match>;
    private matchDetailDocument: AngularFirestoreDocument<match>;
    private inningsCollection: AngularFirestoreCollection<innings>;
    private battingCollection: AngularFirestoreCollection<batting>;
    private bowlingCollection: AngularFirestoreCollection<bowling>;
    public matchesObservable: Observable<match[]>;


    constructor(private afs: AngularFirestore) {

    }
    public getMatchlist(seasonYear: number, navTeamId: string): Observable<match[]> {
        // tslint:disable-next-line: max-line-length
        this.matchesCollection = this.afs.collection('Fixtures', ref => ref.where('season', '==', seasonYear).where('navestock_team_id', '==', navTeamId).orderBy('match_date', 'asc'));
        return this.matchesCollection.valueChanges();
    }

    public getMatchlistPerMonth(seasonYear: number, navTeamId: string): Observable<MatchsPerMonth[]> {
        let tempYear: number = null;
        let tempMonth: number = null;
        let i: number = null;

        return new Observable((observer) => { // wrap getMatchlist in a new Observable
            this.getMatchlist(seasonYear, navTeamId).subscribe({
                next: resMatch => {
                    const matchesperSeason: MatchsPerMonth[] = [];
                    resMatch.forEach(element => {
                        const md = element.match_date.toDate();
                        if (tempMonth === md.getMonth() && tempYear === md.getFullYear()) {
                            matchesperSeason[i - 1].addMatch(element);
                        } else {
                            tempYear = md.getFullYear();
                            tempMonth = md.getMonth();
                            matchesperSeason.push(new MatchsPerMonth(element));
                            i = matchesperSeason.length;
                        } // end if
                        observer.next(matchesperSeason); // Emit value to observer
                    });
                },
                error: err => { console.log('Received an errror: ' + err); },
                complete: () => { }
            }); // subscribe end
        });
    }

    public getSeasons(): Observable<SeasonList> {
        let seasonDoc: AngularFirestoreDocument<SeasonList>;
        seasonDoc = this.afs.doc<SeasonList>('Fixtures/seasons');
        const seasonList: Observable<SeasonList> = seasonDoc.valueChanges();

        return seasonList;
    }

    public getMatchDetail(matchId: string): Observable<match> {
        this.matchDetailDocument = this.afs.doc<match>('Fixtures/' + matchId);
        return this.matchDetailDocument.valueChanges();
    }

    public getMatchInningsDetails(matchId: string): Observable<innings[]> {
        this.inningsCollection = this.afs.collection<innings>('Fixtures/' + matchId + '/innings');
        return this.inningsCollection.valueChanges();
    }

    public getBatting(matchId: string, teamId: string): Observable<batting[]> {
        this.battingCollection = this.afs.collection<batting>('Fixtures/' + matchId + '/innings/' + teamId + '/batting', ref => ref.orderBy('position', 'asc'));
        return this.battingCollection.valueChanges();
    }

    public getBowling(matchId: string, teamId: string): Observable<bowling[]> {
        this.bowlingCollection = this.afs.collection<bowling>('Fixtures/' + matchId + '/innings/' + teamId + '/bowling');
        return this.bowlingCollection.valueChanges();
    }

    /* **** Match Widget data service. **** */

    // Get fixture widget data from navestock webservice
    private getMatchWidgetData_FB(teamId: string, nRecordstoreturn: number): Observable<match[]> {
        let matchesCollection: AngularFirestoreCollection<match>;
        matchesCollection = this.afs.collection('Fixtures', ref => (
                                                            ref.where('navestock_team_id', '==', teamId)
                                                            .where('match_date', '>=', new Date()))
                                                            .orderBy('match_date', 'desc')
                                                            .limit(nRecordstoreturn)
                                                            );
        return matchesCollection.valueChanges();
    }

    // Read data received from getfixturewidgetData_Http and parse into fixturewidgetdata object.
    // NaveStockTeams: {tmName:string; tmId:number;}[]
    /*
    getmatchWidgetData(NaveStockTeams: Observable<navestockTeam[]>, nRecordstoreturn: number): { teamName: string, teamId: string, matchList: Observable<match[]> }[] {
        const matchWidgetData: { teamName: string, teamId: string, matchList: Observable<match[]> }[] = [];
        NaveStockTeams.subscribe(res => {
            res.forEach(tm => {
                matchWidgetData.push({
                                teamName: tm.team_name, teamId: tm.team_id,
                                matchList: this.getMatchWidgetData_FB(tm.team_id, nRecordstoreturn) 
                                });
            });
        });
        return matchWidgetData;
    }
    */
   getmatchWidgetData(nRecordstoreturn: number): Observable<match[]> {
    let matchWidgetData: AngularFirestoreCollection<match>;
    matchWidgetData = this.afs.collection('Fixtures', ref => (
                                                        ref
                                                        .where('published', '==', 'Yes')
                                                        .where('match_date', '>=', new Date()))
                                                        .orderBy('match_date', 'asc')
                                                        .limit(nRecordstoreturn)
                                                        );
    return matchWidgetData.valueChanges();
}

/**
 * Method to update the Latitude and Longeture of the ground at which the match is played
 */
public updateLatLng(matchId: string, Lat: string, Lng: string ) {
    this.afs.doc('Fixtures/' + matchId).update({'ground_latitude' : Lat, 'ground_longitude' : Lng})
    .catch(
        err => { console.error(err); }
    ).then(
        () => {window.location.reload(); }
    );
}
/**
 * @summary Get  address details for each match played
 * 
 * @param seasonYear The season for which the matches must be returned
*/
public allMatchAddresses(seasonYear: number): Observable<match[]> {
    const matchesCollection = this.afs.collection<match>('Fixtures', ref =>
                                                                     ref.where('season', '==', seasonYear)
                                                                     .where('away_club_id', '==', '4513')
                                                                     );
    return matchesCollection.valueChanges();
}

}



