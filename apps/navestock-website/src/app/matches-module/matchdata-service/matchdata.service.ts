import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { match, Match, PlayCricketMatchList } from '../objects/match.object';
import { SeasonList } from '../objects/season.list.object';
import { MatchsPerMonth } from '../matchpermonth.object';
import { innings } from '../objects/innings.object';
import { batting } from '../objects/batting.object';
import { bowling } from '../objects/bowling.object';
import { navestockTeam } from '../objects/navestock-teams.objects';

import { from } from 'rxjs/internal/observable/from';
import { filter, reduce, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class MatchDataService {
  private matchesCollection: AngularFirestoreCollection<match>;
  private matchDetailDocument: AngularFirestoreDocument<match>;
  private inningsCollection: AngularFirestoreCollection<innings>;
  private battingCollection: AngularFirestoreCollection<batting>;
  private bowlingCollection: AngularFirestoreCollection<bowling>;
  public matchesObservable: Observable<match[]>;

  constructor(private afs: AngularFirestore) {}

  /*
  public getMatchlist( seasonYear: number, navTeamId: string ): Observable<match[]> {
    this.matchesCollection = this.afs.collection('Fixtures', (ref) =>
      ref
        .where('season', '==', seasonYear)
        .where('navestock_team_id', '==', navTeamId)
        .orderBy('match_date', 'asc')
    );
    return this.matchesCollection.valueChanges();
  }
*/

  private getMatchlist(seasonYear: string, navTeamId: string): Observable<match[]> {
   
    // Firestore query 'MatchList' to get match list data filtered by season
    const matchArrayCollection: AngularFirestoreCollection = this.afs.collection('MatchList', (ref) =>
    ref
      .where('season', '==', seasonYear)
  );
    
  const matchArray$ = matchArrayCollection.valueChanges();

  /*
    const matchArray$: Observable<PlayCricketMatchList> = from(
      [{"matches":[{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Rayleigh CC","match_date":{"seconds":1619870400,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758718","opposition_club_id":"5276","opposition_team_name":"2nd XI","opposition_team_id":"22338"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Bentley CC","match_date":{"seconds":1620475200,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758727","opposition_club_id":"1078","opposition_team_name":"2nd XI","opposition_team_id":"79141"},{"navestock_team_name":"Sunday XI","last_updated":{"seconds":1603882800,"nanoseconds":0},"navestock_team_id":"50485","opposition_club_name":"Pecos CC","match_date":{"seconds":1620559800,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4540580","opposition_club_id":"11640","opposition_team_name":"1st XI","opposition_team_id":"197352"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Great Wakering CC","match_date":{"seconds":1621080000,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758741","opposition_club_id":"3023","opposition_team_name":"1st XI","opposition_team_id":"99287"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Great Waltham CC","match_date":{"seconds":1621684800,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758752","opposition_club_id":"3024","opposition_team_name":"2nd XI","opposition_team_id":"107434"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Canvey Island CC","match_date":{"seconds":1622289600,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758757","opposition_club_id":"1640","opposition_team_name":"1st XI","opposition_team_id":"12231"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Rainham CC, Essex","match_date":{"seconds":1622894400,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758772","opposition_club_id":"5251","opposition_team_name":"2nd XI","opposition_team_id":"51208"},{"navestock_team_name":"Sunday XI","last_updated":{"seconds":1605783600,"nanoseconds":0},"navestock_team_id":"50485","opposition_club_name":"Rosaneri CC","match_date":{"seconds":1622982600,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4553975","opposition_club_id":"11623","opposition_team_name":"Friendly XI","opposition_team_id":"188156"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Great Totham CC","match_date":{"seconds":1623499200,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758783","opposition_club_id":"3022","opposition_team_name":"2nd XI","opposition_team_id":"38012"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"South Loughton CC","match_date":{"seconds":1624104000,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758803","opposition_club_id":"5781","opposition_team_name":"Saturday 1st XI","opposition_team_id":"13660"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Brookweald CC","match_date":{"seconds":1624708800,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758812","opposition_club_id":"1485","opposition_team_name":"1st XI","opposition_team_id":"36961"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Rayleigh CC","match_date":{"seconds":1625313600,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758822","opposition_club_id":"5276","opposition_team_name":"2nd XI","opposition_team_id":"22338"},{"navestock_team_name":"Sunday XI","last_updated":{"seconds":1607338800,"nanoseconds":0},"navestock_team_id":"50485","opposition_club_name":"North Weald CC","match_date":{"seconds":1625400000,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4567800","opposition_club_id":"4659","opposition_team_name":"Sunday A","opposition_team_id":"32560"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Bentley CC","match_date":{"seconds":1625918400,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758836","opposition_club_id":"1078","opposition_team_name":"2nd XI","opposition_team_id":"79141"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Great Wakering CC","match_date":{"seconds":1626523200,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758841","opposition_club_id":"3023","opposition_team_name":"1st XI","opposition_team_id":"99287"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Great Waltham CC","match_date":{"seconds":1627128000,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758848","opposition_club_id":"3024","opposition_team_name":"2nd XI","opposition_team_id":"107434"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Canvey Island CC","match_date":{"seconds":1627732800,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758853","opposition_club_id":"1640","opposition_team_name":"1st XI","opposition_team_id":"12231"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Rainham CC, Essex","match_date":{"seconds":1628337600,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758859","opposition_club_id":"5251","opposition_team_name":"2nd XI","opposition_team_id":"51208"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Great Totham CC","match_date":{"seconds":1628942400,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758864","opposition_club_id":"3022","opposition_team_name":"2nd XI","opposition_team_id":"38012"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"South Loughton CC","match_date":{"seconds":1629547200,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758870","opposition_club_id":"5781","opposition_team_name":"Saturday 1st XI","opposition_team_id":"13660"},{"navestock_team_name":"1st XI","last_updated":{"seconds":1613991600,"nanoseconds":0},"navestock_team_id":"204935","opposition_club_name":"Brookweald CC","match_date":{"seconds":1630152000,"nanoseconds":0},"navestock_club_name":"Navestock CC","navestock_club_id":"4513","season":2021,"id":"4758875","opposition_club_id":"1485","opposition_team_name":"1st XI","opposition_team_id":"36961"}],"season":"2021"}]
    );
*/
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const arrayGroupBy = array =>
      array.reduce((objectsByKeyValue, obj) => {
        const matchDate = new Date(obj.match_date.seconds  * 1000)
        const value = monthNames[matchDate.getMonth()] + " " + matchDate.getFullYear().toString();
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
      }, {});

    //todo: start here

    matchArray$.pipe(
      //tap(ev => console.log('Data into the pipe: ', JSON.stringify(ev))),
      reduce((acc, cur) => cur, []),
      reduce((acc, cur) => cur["matches"], []),
      tap(ev => console.log('after reduce: ', JSON.stringify(ev))),
      map( ml => ml.filter(mtf => mtf.navestock_team_id === navTeamId) ),
      tap(ev => console.log('after filter: ', JSON.stringify(ev))),
      map(ml => ml.sort((a, b) => (a.match_date > b.match_date) ? 1 : -1)),
      tap(ev => console.log('after sort: ', JSON.stringify(ev))),
      map(ml => ml.reverse()),
      tap(ev => console.log('after reverse: ', JSON.stringify(ev))),
      map(ml => arrayGroupBy(ml)),
      tap(ev => console.log('after arrayGroupBy: ', JSON.stringify(ev))),
      catchError(val => of(`I caught: ${val}`))
    ).subscribe(
      r => console.log('Final match list: ', JSON.stringify(r)),
      err => console.error('Observer got an error: ' + err),
      () => console.log('Done')
    );


    //fixme: remove later
    this.matchesCollection = this.afs.collection('Fixtures', (ref) =>
      ref
        .where('season', '==', +seasonYear)
        .where('navestock_team_id', '==', navTeamId)
        .orderBy('match_date', 'asc')
    );
    return this.matchesCollection.valueChanges();
  }

  public getMatchlistPerMonth(
    seasonYear: string,
    navTeamId: string
  ): Observable<MatchsPerMonth[]> {
    let tempYear: number = null;
    let tempMonth: number = null;
    let i: number = null;

    return new Observable((observer) => {
      // wrap getMatchlist in a new Observable
      this.getMatchlist(seasonYear, navTeamId).subscribe({
        next: (resMatch) => {
          const matchesperSeason: MatchsPerMonth[] = [];
          resMatch.forEach((element) => {
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
        error: (err) => {
          console.log('Received an errror: ' + err);
        },
        complete: () => {},
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
    this.inningsCollection = this.afs.collection<innings>(
      'Fixtures/' + matchId + '/innings'
    );
    return this.inningsCollection.valueChanges();
  }

  public getBatting(matchId: string, teamId: string): Observable<batting[]> {
    this.battingCollection = this.afs.collection<batting>(
      'Fixtures/' + matchId + '/innings/' + teamId + '/batting',
      (ref) => ref.orderBy('position', 'asc')
    );
    return this.battingCollection.valueChanges();
  }

  public getBowling(matchId: string, teamId: string): Observable<bowling[]> {
    this.bowlingCollection = this.afs.collection<bowling>(
      'Fixtures/' + matchId + '/innings/' + teamId + '/bowling'
    );
    return this.bowlingCollection.valueChanges();
  }

  /* **** Match Widget data service. **** */

  // Get fixture widget data from navestock webservice
  private getMatchWidgetData_FB(
    teamId: string,
    nRecordstoreturn: number
  ): Observable<match[]> {
    let matchesCollection: AngularFirestoreCollection<match>;
    matchesCollection = this.afs.collection('Fixtures', (ref) =>
      ref
        .where('navestock_team_id', '==', teamId)
        .where('match_date', '>=', new Date())
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
    matchWidgetData = this.afs.collection('Fixtures', (ref) =>
      ref
        .where('published', '==', 'Yes')
        .where('match_date', '>=', new Date())
        .orderBy('match_date', 'asc')
        .limit(nRecordstoreturn)
    );
    return matchWidgetData.valueChanges();
  }

  /**
   * Method to update the Latitude and Longeture of the ground at which the match is played
   */
  public updateLatLng(matchId: string, Lat: string, Lng: string) {
    this.afs
      .doc('Fixtures/' + matchId)
      .update({ ground_latitude: Lat, ground_longitude: Lng })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        window.location.reload();
      });
  }
  /**
   * @summary Get  address details for each match played
   *
   * @param seasonYear The season for which the matches must be returned
   */
  public allMatchAddresses(seasonYear: number): Observable<match[]> {
    const matchesCollection = this.afs.collection<match>('Fixtures', (ref) =>
      ref.where('season', '==', seasonYear).where('away_club_id', '==', '4513')
    );
    return matchesCollection.valueChanges();
  }
}
