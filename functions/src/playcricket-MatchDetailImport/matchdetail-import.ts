import {WriteResult } from '@google-cloud/firestore';

import { PlayCricketMatchDetailAPICall } from "./PlayCricketMatchDetailAPICall";
import { MatchDetails } from "./matchdetails";
import { InningsDetails } from "./inningsdetails";

/* Navestcock Objects */
import { innings } from '../objects/innings.object';
import { batting } from '../objects/batting.object';
import { bowling } from '../objects/bowling.object';
import { team } from '../objects/team.object';

export class MatchDetailImport {
    inningsData: innings = new innings;
    battingData: batting = new batting;
    bowlingData: bowling = new bowling;
    teams: team[] = [];


    /**
     * Gets detailed match data (matchdetails as well as batting and bowling scorecard data) from PlayCricket API
     * Data parsed in two steps:
     * 1. Parsing the match details and executing a batch write to update the Firestore DB, returning a batch Writeresult
     * 2. Parsing the Innings details and executing a batch write to update the Firestore DB, returning a batch Writeresult
     * Both Promise<WriteResult> are pushed to a Array which the function returns
     * 
     * @param matchID : Play Cricket ID for the match being imported
     * @returns Array of WriteResult Promises for the Firestore DB batch writes.
     */
    public getImportData(matchID: string): Array<Promise<WriteResult[]>> {
        const playCricketMatchDetailAPICall = new PlayCricketMatchDetailAPICall();
        const matchDetails = new MatchDetails();
        const inningsDetails = new InningsDetails();
        const PromiseAll: Array<Promise<WriteResult[]>> = [];
         /**
         * Step 1: Call the PlayCricket API to retrieve the match data.
         * Using the PlayCricketMatchDetailAPICall.playCricketApiCall function
        */
        playCricketMatchDetailAPICall.playCricketApiCall(matchID)
            .then(
                APIRes => {
                    /**
                     * Step 2: Take the data returend by the API and parse the Match Details.
                     * Using the MatchDetails.getMatchDetails function
                     */
                    PromiseAll.push(matchDetails.getMatchDetails(APIRes.body));
                    /** 
                    * Step 3: Take the data returend by the API and parse the Innings Details.
                    *  Using the InningsDetails.getInnings function
                    */
                   // PromiseAll.push.apply(PromiseAll, inningsDetails.getInnings(APIRes.body));
                    PromiseAll.push(inningsDetails.getInnings(APIRes.body));
                    
                })
            .catch(
                err => {console.error(err)}
            )
        return PromiseAll
    }


}
