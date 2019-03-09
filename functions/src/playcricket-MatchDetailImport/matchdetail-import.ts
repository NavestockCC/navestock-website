
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


    /* Import the  match data from the form  */
    public getImportData(matchID: string): any[] {
        const playCricketMatchDetailAPICall = new PlayCricketMatchDetailAPICall();
        const matchDetails = new MatchDetails();
        const inningsDetails = new InningsDetails();
        const PromiseAll = [];
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
                    PromiseAll.push.apply(PromiseAll, inningsDetails.getInnings(APIRes.body));
                })
            .catch(
                err => {console.error(err)}
            )
        return PromiseAll
    }


}
