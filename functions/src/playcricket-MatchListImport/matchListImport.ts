import * as admin from 'firebase-admin';

/* Navestcock Objects */
import {match} from '../objects/match.object';


export class MatchListImport {

constructor(private afs = admin.firestore()) {
}

/* Update the match list, season is kept in the Firestore at "FixtureImport/MatchList" */
public updateMatchList(mList:match[]){
    const PromisesAll = [];

    /**
     * 1. For each match list item lookup to see if the match exsists in the Firestore at "Fixture"
     * 1.1. If it exsists, check if the record "last_updated" is not equal to the fixture list.
     * 1.1.1 if the "last_updated" is not equal then update Firestore at "Fixture" with new data
     * 1.2. If the match does not exsist in the Firestore at "Fixture" add the new match 
     */
    mList.forEach(matchElement => {
        const PA = this.afs.doc('Fixtures/' + matchElement.id).get().then(
           async mtch => {
                /** Check to see if match exsists in database If YES then perform update, If NO the create new record  */
                if(mtch.exists === true){
                    const matchDoc = mtch.data();
                    /** Check if 'last_updated' value in the DB is equal to 'last_updated' value from PlayCricket . If Yes no update required. If No update the record in the database  */
                    if(matchElement.last_updated.isEqual(matchDoc.last_updated)===false){
                        /**Update record in the DB with new values from PlayCricket */
                       await this.afs.doc('Fixtures/' + matchElement.id).update({
                        id: matchElement.id,
                        status: matchElement.status,
                        published: matchElement.published,
                        last_updated: matchElement.last_updated,
                        league_name: matchElement.league_name,
                        league_id: matchElement.league_id,
                        competition_name: matchElement.competition_name,
                        competition_id: matchElement.competition_id,
                        competition_type: matchElement.competition_type,
                        match_type: matchElement.match_type,
                        game_type: matchElement.game_type,
                        season: matchElement.season,
                        match_date: matchElement.match_date,
                        match_time: matchElement.match_time,
                        ground_name: matchElement.ground_name,
                        ground_id: matchElement.ground_id,
                        ground_latitude: matchElement.ground_latitude,
                        ground_longitude: matchElement.ground_longitude,
                        home_club_name: matchElement.home_club_name,
                        home_team_name: matchElement.home_team_name,
                        home_team_id: matchElement.home_team_id,
                        home_club_id: matchElement.home_club_id,
                        home_team_isNavestock: matchElement.home_team_isNavestock,
                        navestock_club_name: matchElement.navestock_club_name,
                        navestock_team_name: matchElement.navestock_team_name,
                        navestock_team_id: matchElement.navestock_team_id,
                        navestock_club_id: matchElement.navestock_club_id,
                        opposition_club_name: matchElement.opposition_club_name,
                        opposition_team_name: matchElement.opposition_team_name,
                        opposition_team_id: matchElement.opposition_team_id,
                        opposition_club_id: matchElement.opposition_club_id,
                        away_club_name: matchElement.away_club_name,
                        away_team_name: matchElement.away_team_name,
                        away_team_id: matchElement.away_team_id,
                        away_club_id: matchElement.away_club_id,
                        lastwrite: admin.firestore.Timestamp.now()
                       });
                    }
                } else {
                    /**Create new record in the DB with values from PlayCricket */
                   await this.afs.doc('Fixtures/' + matchElement.id).set(
                    {
                        id: matchElement.id,
                        status: matchElement.status,
                        published: matchElement.published,
                        last_updated: matchElement.last_updated,
                        league_name: matchElement.league_name,
                        league_id: matchElement.league_id,
                        competition_name: matchElement.competition_name,
                        competition_id: matchElement.competition_id,
                        competition_type: matchElement.competition_type,
                        match_type: matchElement.match_type,
                        game_type: matchElement.game_type,
                        season: matchElement.season,
                        match_date: matchElement.match_date,
                        match_time: matchElement.match_time,
                        ground_name: matchElement.ground_name,
                        ground_id: matchElement.ground_id,
                        ground_latitude: matchElement.ground_latitude,
                        ground_longitude: matchElement.ground_longitude,
                        home_club_name: matchElement.home_club_name,
                        home_team_name: matchElement.home_team_name,
                        home_team_id: matchElement.home_team_id,
                        home_club_id: matchElement.home_club_id,
                        home_team_isNavestock: matchElement.home_team_isNavestock,
                        navestock_club_name: matchElement.navestock_club_name,
                        navestock_team_name: matchElement.navestock_team_name,
                        navestock_team_id: matchElement.navestock_team_id,
                        navestock_club_id: matchElement.navestock_club_id,
                        opposition_club_name: matchElement.opposition_club_name,
                        opposition_team_name: matchElement.opposition_team_name,
                        opposition_team_id: matchElement.opposition_team_id,
                        opposition_club_id: matchElement.opposition_club_id,
                        away_club_name: matchElement.away_club_name,
                        away_team_name: matchElement.away_team_name,
                        away_team_id: matchElement.away_team_id,
                        away_club_id: matchElement.away_club_id,
                        lastwrite: admin.firestore.Timestamp.now()
                       });
                }
            }
        )
        PromisesAll.push(PA);
    });

    return PromisesAll;
}



/* Parse data into match object  */
public  getMatchDetails(importDataObject): match{
    const matchResult = new match();

    matchResult.setMatch(
       importDataObject.id,
       importDataObject.status,
       importDataObject.published,
       importDataObject.last_updated,
       importDataObject.league_name,
       importDataObject.league_id,
       importDataObject.competition_name,
       importDataObject.competition_id,
       importDataObject.competition_type,
       importDataObject.match_type,
       importDataObject.game_type,
       importDataObject.season,
       importDataObject.match_date,
       importDataObject.match_time,
       importDataObject.ground_name,
       importDataObject.ground_id,
       importDataObject.ground_latitude,
       importDataObject.ground_longitude,
       importDataObject.home_club_name,
       importDataObject.home_team_name,
       importDataObject.home_team_id,
       importDataObject.home_club_id,
       importDataObject.away_club_name,
       importDataObject.away_team_name,
       importDataObject.away_team_id,
       importDataObject.away_club_id,
    )
    
    return matchResult;
} // getMatchDetails ends

} // class end