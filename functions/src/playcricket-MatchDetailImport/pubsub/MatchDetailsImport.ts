/**
 * Firebase Function
 * @author Lefras Coetzee
 * @description Function to import the match details pulled from the PlayCricket Match Details API.   
 * @description The function is triggered from the 'PlayCricket_Match_Details' PubSup topic
 * 
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {match} from '../../objects/match.object';
import { DocumentReference } from '@google-cloud/firestore';

export const matchDetailImport = functions.pubsub
.topic('PlayCricket_Match_Details_Data')
.onPublish( msgPayload => {
    // Validate if the payload has delivered the match details
    if (msgPayload.json.match_details === undefined) {
        console.error(new Error('E_matchDetailImport_0: Match Details not found'));
        return 'matchDetailImport: execution ERROR!!!';
      } else {

        // If the match details are delivered in the payload then start update the DB
        const afs = admin.firestore()
        const fbMatchDetail = afs.collection('Fixtures');
        const matchResult = new match();
        const importDataObject = {match_details: msgPayload.json.match_details }
        const matchID:string = importDataObject.match_details[0].id.toString();
        const dRef:DocumentReference = fbMatchDetail.doc(matchID.toString());
        const matchBatch = afs.batch()
    
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
        
        // Create the Firestore Batch and Commit the changes.
        matchBatch.set(dRef, Object.assign({}, matchResult), { merge: true });
        matchBatch.commit().then(
            wrteResults => {
                wrteResults.forEach( wr => {
                    if(wrteResults.length > 0){
                        console.log(wrteResults.length + ' docs updated in Match Innings batch for MatchID:' + matchID + ' @ ' + wrteResults[0].writeTime.toDate());
                    };
                })
            }
        ).catch(
            err => {
                console.error(new Error('E_MatchDetail_1: ' + err));
            }
        );

        return 'matchDetailImport: completed sucessfully';
      }
    }
)