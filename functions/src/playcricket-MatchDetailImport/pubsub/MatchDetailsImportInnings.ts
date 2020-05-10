/**
 * Firebase Function
 * @author Lefras Coetzee
 * @description Function to import the match innings pulled from the PlayCricket Match Details API.   
 * @description The function is triggered from the 'PlayCricket_Match_Details' PubSup topic
 * 
 */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { innings } from '../../objects/innings.object';
import { batting } from '../../objects/batting.object';
import { bowling } from '../../objects/bowling.object';
import { team } from '../../objects/team.object';
import { InningsDetailsServices } from "../services/inningsdetails_Services";
import { DocumentReference, CollectionReference, WriteBatch, QuerySnapshot } from '@google-cloud/firestore';


export const matchDetailImportInnings = functions.pubsub
    .topic('PlayCricket_Match_Details_Data')
    .onPublish(async msgPayload => {
        // Validate if the payload has delivered the match details
        if (msgPayload.json.match_details === undefined) {
            console.error(new Error('E_MatchInnings_1: Match Details not found'));
            return 'matchDetailImportInnings: execution ERROR!!!';

        } else {

            const afs = admin.firestore();
            const inningsDetailsServices = new InningsDetailsServices();
            const fbMatchDetail: CollectionReference = afs.collection('Fixtures')
            let inningsData: innings = new innings();
            let battingData: batting = new batting();
            let bowlingData: bowling = new bowling();
            const teams: team[] = [];
            const inningBatch: WriteBatch = afs.batch();
            const importDataObject = { match_details: msgPayload.json.match_details }
            const matchId: string = importDataObject.match_details[0].id.toString(); // Extract the id (match id) to use as key to store the data
            const tmpImportData = importDataObject.match_details[0].innings; //Extract the innings data


            //Parse teams
            let tmpTeam: team = new team(importDataObject.match_details[0].home_club_name, importDataObject.match_details[0].home_team_id, 'home')
            teams.push(tmpTeam);
            tmpTeam = new team(importDataObject.match_details[0].away_club_name, importDataObject.match_details[0].away_team_id, 'away')
            teams.push(tmpTeam);


            // Extract innings data from the match data
            if (tmpImportData !== null) {

            // Remove all exsisting innings data
                try {
                    const removeInnings: QuerySnapshot[] = await inningsDetailsServices.inningsDataToRemove(matchId, teams)
                    removeInnings.map(
                        inningsRes => {
                            inningsRes.docs.map(
                                doc => {
                                    inningBatch.delete(doc.ref);
                                })
                        })
                } catch (error) {
                    console.error(new Error('E_MatchInnings_2: Error when deleting innings data: ' + error));
                }


                //Read each innings and extract the innings scores and team info
                tmpImportData.forEach((inningsElement: any) => {
                    inningsData = inningsDetailsServices.creatInningsObject(inningsElement, teams);
                    //write innings info to Firebase
                    const dRef: DocumentReference = fbMatchDetail.doc(matchId.toString()).collection('innings').doc(inningsData.team_batting_id.toString());
                    inningBatch.set(dRef, Object.assign({}, inningsData));

                    if (inningsDetailsServices.getHomeOrAway(inningsData.team_batting_id, teams) === 'home') {
                        const dRefHome: DocumentReference = fbMatchDetail.doc(matchId.toString());
                        const dDataHome = { home_team_runs: inningsData.runs, home_team_wickets: inningsData.wickets };
                        inningBatch.update(dRefHome, dDataHome);
                    }
                    if (inningsDetailsServices.getHomeOrAway(inningsData.team_batting_id, teams) === 'away') {
                        const dRefAway: DocumentReference = fbMatchDetail.doc(matchId.toString());
                        const dDataAway = { away_team_runs: inningsData.runs, away_team_wickets: inningsData.wickets };
                        inningBatch.update(dRefAway, dDataAway);
                    }

                    //extract batting data from the innings
                    inningsElement.bat.forEach((batElement: any) => {
                        try {
                            battingData = inningsDetailsServices.createBattingObject(batElement);
                            const dRefBatting: DocumentReference = fbMatchDetail.doc(matchId.toString()).collection('innings').doc(inningsData.team_batting_id.toString()).collection('batting').doc(battingData.batsman_id.toString());
                            //write batting data to Firebase
                            inningBatch.set(dRefBatting, Object.assign({}, battingData));
                        }
                        catch{
                            (e: any) => console.error(new Error('E_MatchInnings_3: ' + e));
                        }

                    });
                    //extract bowling data from innings
                    inningsElement.bowl.forEach((bowlElement: any) => {
                        try {
                            bowlingData = inningsDetailsServices.createBolingObject(bowlElement);
                            //write bowling data to Firebase
                            const dRefBowling: DocumentReference = fbMatchDetail.doc(matchId.toString()).collection('innings').doc(inningsData.team_batting_id.toString()).collection('bowling').doc(bowlingData.bowler_id.toString());
                            inningBatch.set(dRefBowling, Object.assign({}, bowlingData));
                        }
                        catch{
                            (e: any) => console.error(new Error('E_MatchInnings_4: ' + e));
                        }

                    });
                }); // end forEach  - innings  extract
            }// end if inningsData != null
            inningBatch.commit().then(
                wrteResults => {
                    if(wrteResults.length > 0){
                        console.log(wrteResults.length + ' docs updated in Match Innings batch for MatchID:' + matchId + ' @ ' + wrteResults[0].writeTime.toDate());
                    };
                }
            ).catch(
                err => {
                    console.error(new Error('E_MatchInnings_5: ' + err));
                }
            );
            return 'matchDetailImportInnings: completed sucessfully';
        }
    }
    )