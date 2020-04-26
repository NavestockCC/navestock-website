import * as admin from 'firebase-admin';
import {innings} from '../../objects/innings.object';
import {batting} from '../../objects/batting.object';
import {bowling} from '../../objects/bowling.object';
import {team} from '../../objects/team.object';
import { QuerySnapshot } from '@google-cloud/firestore';



export class InningsDetailsServices {
    private afs = admin.firestore();
  
/* Create innings object from innings Object method */
public creatInningsObject(inningsElement:any, teams:team[]):innings{
    const tmpInnings = new innings();
    const bowlingTeam: team = this.getOppositeTeam(inningsElement.team_batting_id, teams);

     tmpInnings.setInnings(
        inningsElement.team_batting_name,
        inningsElement.team_batting_id,
        bowlingTeam.team_name,
        bowlingTeam.team_id,
        inningsElement.innings_number,
        inningsElement.extra_byes,
        inningsElement.extra_leg_byes,
        inningsElement.extra_wides,
        inningsElement.extra_no_balls,
        inningsElement.extra_penalty_runs,
        inningsElement.penalties_runs_awarded_in_other_innings,
        inningsElement.total_extras,
        inningsElement.runs,
        inningsElement.wickets,
        inningsElement.overs,
        inningsElement.declared,
        inningsElement.revised_target_runs,
        inningsElement.revised_target_overs
    );
    return tmpInnings;
}


/* Create batting object from batting Object method */    
public createBattingObject(battingElement:any):batting{
    const battingObject: batting = new batting();
    battingObject.setbatting(
        battingElement.position,
        battingElement.batsman_name,
        battingElement.batsman_id,
        battingElement.how_out,
        battingElement.fielder_name,
        battingElement.fielder_id,
        battingElement.bowler_name,
        battingElement.bowler_id,
        battingElement.runs,
        battingElement.fours,
        battingElement.sixes,
        battingElement.balls
    );
    return battingObject;
}

/* Create batting object from batting Object method */
public createBolingObject(bolwlingElement:any):bowling{
    const bowlingObject = new bowling();
    bowlingObject.setBowling(
    bolwlingElement.bowler_name,
    bolwlingElement.bowler_id,
    bolwlingElement.overs,
    bolwlingElement.maidens,
    bolwlingElement.runs,
    bolwlingElement.wides,
    bolwlingElement.wickets,
    bolwlingElement.no_balls
    );
    return bowlingObject;
}

/* Take the team Id and give the other teams data from Teams object*/
public getOppositeTeam(teamId:string, teamData:team[]):team{
 let returnTeam:team = null;
 teamData.forEach(t => {
    if(teamId!==t.team_id){
        returnTeam = t;
    }
 })
return returnTeam;
} 

/* Returns home or away indicating if this is the home team or the away team ID */
public getHomeOrAway(teamId:string, teamData:team[]):string{
let returnHW: string = null
teamData.forEach(t => {
    if(teamId===t.team_id){
        returnHW = t.team_ground;
    }
 })
return returnHW;
}

/**
 * Lookup Fixture using MatchId as key. Return all documet DocumentReferences to batting and bowling Docs in the db for the Fixture
 * @param MatchId 
 * @param Teams 
 * @returns Promise<DocumentReference[]>
 */
public async inningsDataToRemove(MatchId:string, Teams:team[]):Promise<QuerySnapshot[]> {

const inningsData = [];

Teams.forEach( t => {
    inningsData.push(this.afs.collection('Fixtures').doc(MatchId).collection('innings').doc(t.team_id).collection('bowling').get());
    inningsData.push(this.afs.collection('Fixtures').doc(MatchId).collection('innings').doc(t.team_id).collection('batting').get());
    });

return Promise.all(inningsData);
}

}

