/**
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description Function to pull Match Details from the PlayCricket Match Details API.   
 * @description The function is triggered from the 'Match_Detail_Import_PubSub' PubSup topic
 * 
 */

import * as functions from 'firebase-functions';
import { PlayCricketMatchDetailAPICall } from "../services/MatchDetailAPICall";
import { PubSub } from "@google-cloud/pubsub";

import * as navestockCert from "../../environments/navestock-website-04b2617e4f2a";
const credentialsData ={
    projectId: navestockCert.firebaseAuthData.project_id,
    credentials: {
        "private_key": navestockCert.firebaseAuthData.private_key,
        "client_email": navestockCert.firebaseAuthData.client_email
        }
    };

const MatchDetailAPICall = new PlayCricketMatchDetailAPICall();

export const getPlayCricketMatchDetailsPubSub = functions.pubsub
    .topic('Match_Detail_Import')
    .onPublish(msgPayload => {
        if (msgPayload.json.mid === undefined) {
            console.error('E_getPCMD_1: mid param not found');
            return 'getPlayCricketMatchDetailsPubSub: excution ERROR!!!';
        } else {
            const callplayCricketApi = MatchDetailAPICall.playCricketApiCall(msgPayload.json.mid);
            const pubSubClient = new PubSub(credentialsData);
            const pubsubTopic = pubSubClient.topic('PlayCricket_Match_Details_Data', {
                batching: {
                  maxMessages: 500,
                  maxMilliseconds: 5000,
                }
              });

            callplayCricketApi.subscribe(
                resp => {
                    const dataBuffer = Buffer.from(resp);
                    pubsubTopic.publish(dataBuffer)
                        .then(
                            pubSubPublisgResponse => {
                                console.log(`PubSub Message ${pubSubPublisgResponse} published to topic PlayCricket_Match_Details_Data.`);
                            })
                        .catch(
                            err => console.error('E_getPCMD_2: PubSub Message Publish: ' + err)
                        );
                }
            )
        return 'getPlayCricketMatchDetailsPubSub: excution completed sucsesfully';
        }
    }
    )