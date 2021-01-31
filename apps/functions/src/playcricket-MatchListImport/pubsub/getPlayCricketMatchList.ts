/**
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description Function to pull Match Details from the PlayCricket Match Details API.
 * @description The function is triggered from the 'Match_Detail_Import_PubSub' PubSup topic
 *
 */

import * as functions from 'firebase-functions';
import { PubSub } from '@google-cloud/pubsub';

import { PlayCricketMatchListAPICall } from '../service/MatchListAPICall';
import { MatchListImport } from '../service/MatchList_Services';
import { MatchListDB } from '../service/MatchList_DB_service';



/* FIXME: navestockCert
import * as navestockCert from "../../environments/navestock-website-04b2617e4f2a";
const credentialsData ={
    projectId: navestockCert.firebaseAuthData.project_id,
    credentials: {
        "private_key": navestockCert.firebaseAuthData.private_key,
        "client_email": navestockCert.firebaseAuthData.client_email
        }
    };
*/

const MatchListAPICall = new PlayCricketMatchListAPICall();
const matchListImport = new MatchListImport();
const matchListDB = new MatchListDB();

export const getPlayCricketMatchListPubSub = functions.pubsub
  .topic('Match_List_Import')
  .onPublish((msgPayload) => {
    try {

      // Retrieve Season from PubSub: Match_List_Import
      if (msgPayload.json.season === undefined)
        throw new Error('E_getPCML_1: season param not found');
      const callplayCricketApi = MatchListAPICall.playCricketApiCall(
        msgPayload.json.season
      );

      // Call PlayCricket API to import MatchList data
      callplayCricketApi.subscribe((APIResponse) => {
        const matchlist = matchListImport.matchListTransform(
          APIResponse,
          msgPayload.json.season
        );

        //Add MatchList to DB
        matchListDB.addMatchlist(matchlist);

        //Add MatchList to PubSub: PlayCricket_Match_List_Data
        const pubSubClient = new PubSub(); //FIXME: new PubSub(credentialsData);

        //createTopic('PlayCricket_Match_List_Data');
        const pubsubTopic = pubSubClient.topic('PlayCricket_Match_List_Data', {
          batching: {
            maxMessages: 500,
            maxMilliseconds: 5000,
          },
        });

        const dataBuffer = Buffer.from(JSON.stringify(matchlist));
        pubsubTopic
          .publish(dataBuffer)
          .then((pubSubPublisgResponse) => {
            console.log(
              `PubSub Message ${pubSubPublisgResponse} published to topic PlayCricket_Match_List_Data`
            );
          })
          .catch((err) =>
            console.error(
              new Error('E_getPCML_2: PubSub Message Publish: ' + err)
            )
          );
      });
      return 'getPlayCricketMatchDetailsPubSub: excution completed sucsesfully';
    } catch (err) {
      console.error(`Received error while publishing: ${err.message}`);
      process.exitCode = 1;
      return `Received error while publishing: ${err.message}`;
    }
  });

//FIXME: Remove create topic
async function createTopic(topicName: string) {
  // Creates a new topic
  try {
    const pubSubClient = new PubSub();
    await pubSubClient.createTopic(topicName);
    console.log(`Topic ${topicName} created.`);
  } catch (err) {
    console.log(err);
  }
}
