/** 
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description The function is triggered from the 'PlayCricket_Match_Details' PubSup topic
 * @description Function loggs the data pulled from the PlayCricket Match Details API to the console.
 * 
*/


import * as functions from 'firebase-functions';


export const matchListLogger = functions.pubsub
.topic('PlayCricket_Match_List_Data')
.onPublish( msgPayload => {
    if (msgPayload.json.matches === undefined) {
        console.error(new Error('E_matchListLogger_0: Match List not found'));
        return 'matchDetailLogger: execution ERROR!!!';
      } else {
        console.log(JSON.stringify(msgPayload.json.matches));
        return 'matchDetailLogger: execution completed sucessfully';
      }
    }
)