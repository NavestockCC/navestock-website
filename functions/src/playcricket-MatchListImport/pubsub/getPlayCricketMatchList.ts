/**
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description Function to pull Match Details from the PlayCricket Match Details API.   
 * @description The function is triggered from the 'Match_Detail_Import_PubSub' PubSup topic
 * 
 */

import * as functions from 'firebase-functions';
import { PlayCricketMatchListAPICall } from "../service/MatchListAPICall";
import { PubSub } from "@google-cloud/pubsub";

import * as navestockCert from "../../environments/navestock-website-04b2617e4f2a";
const credentialsData ={
    projectId: navestockCert.firebaseAuthData.project_id,
    credentials: {
        "private_key": navestockCert.firebaseAuthData.private_key,
        "client_email": navestockCert.firebaseAuthData.client_email
        }
    };

const MatchListAPICall = new PlayCricketMatchListAPICall();

export const getPlayCricketMatchListPubSub = functions.pubsub
    .topic('Match_List_Import')
    .onPublish(msgPayload => {
        if (msgPayload.json.season === undefined) {
            console.error('E_getPCML_1: season param not found');
            return 'getPlayCricketMatchListPubSub: excution ERROR!!!';
        } else {
            const callplayCricketApi = MatchListAPICall.playCricketApiCall(msgPayload.json.season)
            const pubSubClient = new PubSub(credentialsData);
            const pubsubTopic = pubSubClient.topic('PlayCricket_Match_List_Data', {
                batching: {
                  maxMessages: 500,
                  maxMilliseconds: 5000,
                }
              });

            callplayCricketApi.subscribe(
                APIResponse => {
                    const dataBuffer = Buffer.from(APIResponse);
                    pubsubTopic.publish(dataBuffer)
                        .then(
                            pubSubPublisgResponse => {
                                console.log(`PubSub Message ${pubSubPublisgResponse} published to topic PlayCricket_Match_List_Data.`);
                            })
                        .catch(
                            err => console.error('E_getPCML_2: PubSub Message Publish: ' + err)
                        );
                }
            )
        return 'getPlayCricketMatchDetailsPubSub: excution completed sucsesfully';
        }
    }
    )