import * as admin from 'firebase-admin';
import {innings} from '../objects/innings.object';
import {batting} from '../objects/batting.object';
import {bowling} from '../objects/bowling.object';
import {team} from '../objects/team.object';
import { DocumentReference, WriteResult } from '@google-cloud/firestore';



export class InningsDetails {
    private fbMatchDetail: any;
    private inningsData:innings = new innings;
    private battingData: batting = new batting;
    private bowlingData: bowling = new bowling;
    private teams:team[] = [];

    
    constructor(private afs = admin.firestore()) {
        this.fbMatchDetail = this.afs.collection('Fixtures');
    }


/* Import the innings data from play cricet data and update Firebase */

/**
 * getInnings function takes data from Play-cricket match detail V2 API and parses out the detailed batting and bowling data.
 * The function updates the Firestore DB with the detailed bowling and batting details using a batch (var: inningBatch).
 * 
 * @param importDataObject : data object retrieved from http://play-cricket.com/api/v2/match_detail.json
 * @returns a batch Commit Promise resolved once all of the writes in the batch (inningBatch) have been successfully written to the Firestore DB as an atomic unit. 
 */
getInnings(importDataObject:any):Promise<WriteResult[]>{
    this.inningsData = new innings();
// ## Remove Old Code    const PromisesAll:any = [];
    const inningBatch = this.afs.batch();



    let tmpTeam:team = new team(importDataObject.match_details[0].home_club_name, importDataObject.match_details[0].home_team_id, 'home')
    this.teams.push(tmpTeam);
    tmpTeam = new team(importDataObject.match_details[0].away_club_name, importDataObject.match_details[0].away_team_id, 'away')
    this.teams.push(tmpTeam);

    

    // Extract innings data from the match data
    const tmpImportData = importDataObject.match_details[0].innings;
    if(tmpImportData !== null){
    // Extract the id (match id) to use as key to store the data
    const matchId:string = importDataObject.match_details[0].id.toString();

    //Read each innings and extract the innings scores and team info
    tmpImportData.forEach((inningsElement:any)=> { this.inningsData = this.creatInningsObject(inningsElement);
        //write innings info to Firebase
        // ## Remove Old Code ## PromisesAll.push(this.fbMatchDetail.doc(matchId.toString()).collection('innings').doc(this.inningsData.team_batting_id.toString()).set(Object.assign({}, this.inningsData)));
        const dRef:DocumentReference = this.fbMatchDetail.doc(matchId.toString()).collection('innings').doc(this.inningsData.team_batting_id.toString());
        inningBatch.set(dRef, Object.assign({}, this.inningsData));

        if(this.getHomeOrAway(this.inningsData.team_batting_id) === 'home'){
            // ## Remove Old Code ## PromisesAll.push(this.fbMatchDetail.doc(matchId.toString()).update({home_team_runs:this.inningsData.runs, home_team_wickets:this.inningsData.wickets}));
            const dRefHome:DocumentReference = this.fbMatchDetail.doc(matchId.toString());
            const dDataHome = {home_team_runs:this.inningsData.runs, home_team_wickets:this.inningsData.wickets};
            inningBatch.update( dRefHome, dDataHome );
        }
        if(this.getHomeOrAway(this.inningsData.team_batting_id) === 'away'){
           // ## Remove Old Code ##  PromisesAll.push(this.fbMatchDetail.doc(matchId.toString()).update({away_team_runs:this.inningsData.runs, away_team_wickets:this.inningsData.wickets}));
            const dRefAway:DocumentReference = this.fbMatchDetail.doc(matchId.toString());
            const dDataAway = {away_team_runs:this.inningsData.runs, away_team_wickets:this.inningsData.wickets};
            inningBatch.update( dRefAway, dDataAway );
        }
        
        //extract batting data from the innings
        inningsElement.bat.forEach((batElement:any) => {
            try{
                this.battingData = this.createBattingObject(batElement);
                const dRefBatting: DocumentReference = this.fbMatchDetail.doc(matchId.toString()).collection('innings').doc(this.inningsData.team_batting_id.toString()).collection('batting').doc(this.battingData.batsman_id.toString());
                //write batting data to Firebase
                // ## Remove Old Code ## PromisesAll.push(this.fbMatchDetail.doc(matchId.toString()).collection('innings').doc(this.inningsData.team_batting_id.toString()).collection('batting').doc(this.battingData.batsman_id.toString()).set(Object.assign({}, this.battingData)));
                inningBatch.set(dRefBatting, Object.assign({}, this.battingData));
            }
            catch{
                (e:any) => console.log(e)
            }
         
        });
        //extract bowling data from innings
        inningsElement.bowl.forEach((bowlElement:any) => {
            try{
                this.bowlingData = this.createBolingObject(bowlElement);
                //write bowling data to Firebase
                // ## Remove Old Code ##  PromisesAll.push(this.fbMatchDetail.doc(matchId.toString()).collection('innings').doc(this.inningsData.team_batting_id.toString()).collection('bowling').doc(this.bowlingData.bowler_id.toString()).set(Object.assign({}, this.bowlingData)));
                const dRefBowling: DocumentReference = this.fbMatchDetail.doc(matchId.toString()).collection('innings').doc(this.inningsData.team_batting_id.toString()).collection('bowling').doc(this.bowlingData.bowler_id.toString());
                inningBatch.set(dRefBowling, Object.assign({}, this.bowlingData));
            }
            catch{
                (e:any) => console.log(e)  
            }
               
        });
    }); // end forEach  - innings  extract
    }// end if inningsData != null
    return inningBatch.commit();
} 


/* Create innings object from innings Object method */
private creatInningsObject(inningsElement:any):innings{
    const tmpInnings = new innings();
    const bowlingTeam: team = this.getOppositeTeam(inningsElement.team_batting_id);

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
private createBattingObject(battingElement:any):batting{
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
private createBolingObject(bolwlingElement:any):bowling{
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
private getOppositeTeam(teamId:string):team{
 let returnTeam:team = null;
 this.teams.forEach(t => {
    if(teamId!==t.team_id){
        returnTeam = t;
    }
 })
return returnTeam;
} 

/* Returns home or away indicating if this is the home team or the away team ID */
private getHomeOrAway(teamId:string):string{
let returnHW: string = null
this.teams.forEach(t => {
    if(teamId===t.team_id){
        returnHW = t.team_ground;
    }
 })
return returnHW;
}    
}