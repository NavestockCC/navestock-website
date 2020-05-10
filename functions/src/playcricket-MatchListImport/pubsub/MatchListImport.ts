/** 
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description The function is triggered from the 'PlayCricket_Match_List_Data' PubSup topic
 * @description Function updates the match list from the data pulled from the PlayCricket Match Details API to the console.
 * 
*/


import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import {MatchListImport} from '../service/MatchList_Services';

import { PubSub } from "@google-cloud/pubsub";

import * as navestockCert from "../../environments/navestock-website-04b2617e4f2a";
const credentialsData ={
    projectId: navestockCert.firebaseAuthData.project_id,
    credentials: {
        "private_key": navestockCert.firebaseAuthData.private_key,
        "client_email": navestockCert.firebaseAuthData.client_email
        }
    };

export const matchListImport = functions.pubsub
.topic('PlayCricket_Match_List_Data')
.onPublish( msgPayload => {
    if (msgPayload.json.matches === undefined) {
        console.error(new Error('E_MatchListImport_1: Match List not found'));
        return 'matchDetailLogger: execution ERROR!!!';
      } else {
        // Crearte an instanse of Firestore
            const afs = admin.firestore();
           
            const MatchListImportServices = new MatchListImport();
            const matchListBatch = afs.batch();

        // Crearte an instanse of PubSub and the Topic: Match_Detail_Import
        const pubSubClient = new PubSub(credentialsData);
        const pubsubTopic = pubSubClient.topic('Match_Detail_Import', {
            batching: {
              maxMessages: 500,
              maxMilliseconds: 5000,
            }
          });

        const matchListPromiseArray: Promise<string>[] = [];
        
        // Parse the Paylaod array to extract data and create Match batch and Publish PubSub Payload {"mid": matchId} to Topic: Match_Detail_Import
        msgPayload.json.matches.forEach(matchReturned => {
            if(matchReturned.id === undefined){
                console.error(new Error('E_MatchListImport_4: mid not found not found'));
                }
            else {
                matchListBatch.set(afs.doc('Fixtures/' + matchReturned.id), Object.assign({}, MatchListImportServices.updateDbFields(matchReturned)), { merge: true });
                const payloadData = JSON.stringify({"mid": matchReturned.id});
                const dataBuffer = Buffer.from(payloadData);
                matchListPromiseArray.push(pubsubTopic.publish(dataBuffer));
            }
        });

        // Commit Match batch
        matchListBatch.commit()
        .then( wrteResults => {
                    if(wrteResults.length > 0){
                        console.log(wrteResults.length + ' docs updated in Match List batch @ ' + wrteResults[0].writeTime.toDate());
                    };
            })
        .catch( err => {
                console.error(new Error('E_MatchListImport_3: ' + err));
            });
    
        //Parse response from PubSub.Publish to Topic: Match_Detail_Import
            Promise.all(matchListPromiseArray)
            .then(
                PromAllResp => {
                    PromAllResp.forEach(
                        pubSubPublisgResponse => {
                            console.log(`PubSub Message ${pubSubPublisgResponse} published to topic Match_Detail_Import.`);
                        })
                    })
                    .catch(
                    err => console.error(new Error('E_MatchListImport_2: PubSub Message Publish: ' + err))
                );
        //Terminate function
        return 'matchDetailLogger: execution completed sucessfully';
      }
    }
)