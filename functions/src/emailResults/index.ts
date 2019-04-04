import * as functions from 'firebase-functions'
import {SendResults} from './SendResults'

export const emailResults = functions.https.onRequest(async (req, res) => {
const sendResults = new SendResults ();
let MatchIds:string[] = [];
req.query.mids.forEach(element => {
    MatchIds.push(element);
});

console.info('mids: ' + MatchIds)

await sendResults.sendResultEmail(MatchIds)
    .then( sendResultsResponse => res.send(sendResultsResponse))
    .catch( err => res.send(err));
})