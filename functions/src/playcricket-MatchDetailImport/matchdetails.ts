import * as admin from 'firebase-admin';
import {match} from '../objects/match.object';

export class MatchDetails{
    private fbMatchDetail: any;
    

    constructor(private afs = admin.firestore()) {
        this.fbMatchDetail = this.afs.collection('Fixtures');
    }



/* Import the match result from play cricket */
public getMatchDetails(importDataObject:any){
 
    const matchResult = new match();
    const matchID:string = importDataObject.match_details[0].id.toString();

    let resultUpdated:boolean = false;
    if(importDataObject.match_details[0].result_description !== ''){resultUpdated = true};
    matchResult.setMatchResult(
       importDataObject.match_details[0].id,
       importDataObject.match_details[0].status,
       importDataObject.match_details[0].published,
       importDataObject.match_details[0].last_updated,
       importDataObject.match_details[0].league_id,
       importDataObject.match_details[0].competition_name,
       importDataObject.match_details[0].competition_id,
       importDataObject.match_details[0].competition_type,
       importDataObject.match_details[0].match_type,
       importDataObject.match_details[0].game_type,
       importDataObject.match_details[0].match_date,
       importDataObject.match_details[0].match_time,
       importDataObject.match_details[0].ground_name,
       importDataObject.match_details[0].ground_id,
       importDataObject.match_details[0].home_club_name,
       importDataObject.match_details[0].home_team_name,
       importDataObject.match_details[0].home_team_id,
       importDataObject.match_details[0].home_club_id,
       importDataObject.match_details[0].away_club_name,
       importDataObject.match_details[0].away_team_name,
       importDataObject.match_details[0].away_team_id,
       importDataObject.match_details[0].away_club_id,
       importDataObject.match_details[0].toss_won_by_team_id,
       importDataObject.match_details[0].toss,
       importDataObject.match_details[0].batted_first,
       resultUpdated,
       importDataObject.match_details[0].result_description,
       importDataObject.match_details[0].result_applied_to,
       importDataObject.match_details[0].match_notes
    )
    this.fbMatchDetail.doc(matchID.toString()).update(Object.assign({}, matchResult));
}

   

}