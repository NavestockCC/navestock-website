/** 
 * Navestock Firebase Function
 * @author Lefras Coetzee
 * @description The function is triggered from the 'PlayCricket_Match_Details' PubSup topic
 * @description Function loggs the data pulled from the PlayCricket Match Details API to the console.
 * 
*/


import * as functions from 'firebase-functions';


export const matchDetailLogger = functions.pubsub
.topic('PlayCricket_Match_Details_Data')
.onPublish( msgPayload => {
    if (msgPayload.json.match_details === undefined) {
        console.error('Match Details not found');
        return 'matchDetailLogger: execution ERROR!!!';
      } else {
        console.log(JSON.stringify(msgPayload.json.match_details));
        return 'matchDetailLogger: execution completed sucessfully';
      }
    }
)