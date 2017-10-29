import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import {fixture} from './fixture.object';
import {fixturelist} from './fixturelist.object';
import {scorecard} from './scorecard.object';


const baseUrl:string = 'https://navestockcc-002.appspot.com/_ah/api/navestockccapi/v1';


@Injectable()
export class FixtureDataService{

  public fixturelistdata: {MonthName:string; listoffixtures: fixturelist}[] = [];
  public fixturewidgetdata: {teamname:string; listoffixtures: fixturelist}[] = [];
  public scorecarddata: scorecard[] = [];
  public selectedfixture:fixture = null;
  private fixturedata: Observable<fixture[]>;


constructor(private http:Http) {}

/* **** Fixture Widget data service. **** */
//Get fixture widget data from navestock webservice
private getfixturewidgetData_Http(teamId:number, nRecordstoreturn:number):Observable<fixture[]>{
    const webserviceUrl = '/GetFixtureWidget'; 
    return this.http.get(baseUrl + webserviceUrl + '/' + teamId + '/' + nRecordstoreturn ).map(res => res.json().items as fixture[]);
}

//Read data received from getfixturewidgetData_Http and parse into fixturewidgetdata object.
getfixturewidgetData(NaveStockTeams:any){
    this.fixturewidgetdata.length = 0;
    for(let tmlst of NaveStockTeams){
       let tmpflist: fixturelist = new fixturelist();
       let tmName:string = tmlst.tmName;
       this.fixturedata = this.getfixturewidgetData_Http(tmlst.tmId , 3) as Observable<fixture[]>;
       this.fixturedata.subscribe(v => {if(v && typeof v.length != 'undefined'){v.forEach(element => {
         let fxtr: fixture = new fixture(element.matchId, element.navestockTeamId, element.navestockTeamName, element.oppositionTeamId, element.oppositionTeamName, element.matchType, element.homeOrAway, element.matchDate, element.matchStartTime, element.idGround, element.groundName, element.groundAddress1, element.groundAddress2, element.groundAddressTown, element.groundAddressCounty, element.groundPostCode, element.idWinningTeam, element.winningTeamName, element.navestockRuns, element.navestockWickets, element.oppositionRuns, element.oppositionWickets, element.fixtureStatus, element.oppositionClubId);
         tmpflist.addfixtureadd(fxtr)
          }) //foreach end
       }});//subscribe end

          this.fixturewidgetdata.push({teamname:tmName, listoffixtures:tmpflist});
    }
    return this.fixturewidgetdata;  
}


/* **** Fixture List data service. **** */
//Get fixture list data from navestock webservice
private getfixturelistData_Http(teamId:number, matchYear:string):Observable<fixture[]>{
    const webserviceUrl = '/GetFixtureAll';
    return this.http.get(baseUrl + webserviceUrl + '/' + teamId + '/' + matchYear )
    .map(res => res.json().items as fixture[]);
    }

//Read data received from getfixturelistData_Http and parse into fixturelistdata object.
 getfixturelistData(teamId:number, matchYear:string){
   this.fixturelistdata.length = 0;
   let monthtab:number = null;
   let tmpDate:Date = null;
   let monthString:string = null;
   let i:number = -1;


  this.fixturedata = this.getfixturelistData_Http(teamId , matchYear) as Observable<fixture[]>;
      this.fixturedata.subscribe(v =>  { if(v && typeof v.length != 'undefined'){v.forEach(element => { 
        let fxtr: fixture = new fixture(element.matchId, element.navestockTeamId, element.navestockTeamName, element.oppositionTeamId, element.oppositionTeamName, element.matchType, element.homeOrAway, element.matchDate, element.matchStartTime, element.idGround, element.groundName, element.groundAddress1, element.groundAddress2, element.groundAddressTown, element.groundAddressCounty, element.groundPostCode, element.idWinningTeam, element.winningTeamName, element.navestockRuns, element.navestockWickets, element.oppositionRuns, element.oppositionWickets, element.fixtureStatus, element.oppositionClubId);
        tmpDate = new Date(fxtr.matchDate);
       if(tmpDate.getMonth() != monthtab){
          ++i;
          let fxtrA:fixturelist = new fixturelist() ;
          fxtrA.addfixtureadd(fxtr);
          this.fixturelistdata.push({MonthName:tmpDate.toLocaleString('en-us', { month: "long" }) + " " + tmpDate.getFullYear(), listoffixtures:fxtrA})
          monthtab = tmpDate.getMonth();
        } else{
            this.fixturelistdata[i].MonthName = tmpDate.toLocaleString('en-us', { month: "long" }) + " " + tmpDate.getFullYear();
            this.fixturelistdata[i].listoffixtures.addfixtureadd(fxtr);
        }
         }) //foreach end
       }});//subscribe end 
       return this.fixturelistdata;
    }


/* **** Single Fixture data service. **** */
//Get fixture  data from navestock webservice
getFixtureData(fId:string):Observable<fixture>{
let fdataA:Observable<fixture>;
    const webserviceUrl = '/GetFixture';
    fdataA = this.http.get(baseUrl + webserviceUrl + '/' + fId)
    .map(resp => {return resp.json() as fixture})  
return fdataA;
}

 setSelectedFixture(f:fixture){
     this.selectedfixture = f;
 }


/* **** Scorecard data service. **** */
//Get scorecard data from navestock webservice
getscorecardData(matchId:string):Observable<scorecard[]>{
    const webserviceUrl = '/scorecardcollection';
    return this.http.get(baseUrl + webserviceUrl + '/' + matchId)
    .map(res => res.json().items as scorecard[]);
    }

/* **** Match Years data service. **** */
//Get the years fro which match data is stored in the db
getmatchYears(teamId:number):Observable<string[]>{
    const webserviceUrl = '/stringcollection';
    return this.http.get(baseUrl + webserviceUrl + '/' + teamId)
    .map(res => res.json().items as string[]);
    } 

}