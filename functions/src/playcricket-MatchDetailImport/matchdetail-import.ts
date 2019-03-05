
import * as request from 'request';
import {MatchDetails} from "./matchdetails"; 
import { InningsDetails } from "./inningsdetails";

/* Navestcock Objects */
import {innings} from '../objects/innings.object';
import {batting} from '../objects/batting.object';
import {bowling} from '../objects/bowling.object';
import {team} from '../objects/team.object';

export class MatchDetailImport {
    inningsData:innings = new innings;
    battingData: batting = new batting;
    bowlingData: bowling = new bowling;
    teams:team[] = [];


/* Import the PlayCricket data */
public getPlayCricketData(matchID:string):void{
        const gID = this.getImportData;
        const url:string = "http://play-cricket.com/api/v2/match_detail.json?api_token=b5827cc30a9019c48af36df94eeb386c&match_id=" + matchID;
        request({url: url}, function (error, response, body){
            gID(JSON.parse(body));   
        })
}


/* Import the  match data from the form  */
private getImportData(importData:any){
        const matchDetails = new MatchDetails();
        const inningsDetails = new InningsDetails();
        /**
         * Step 1: get the match result
         * this.getMatchDetails(importData)
         */
            matchDetails.getMatchDetails(importData);
         
         /** Step 2: get the innings data
         * this.getInnings(JSON.parse(importData));
         */
            inningsDetails.getInnings(importData);

}


}
