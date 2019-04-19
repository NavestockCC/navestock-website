


import * as functions from 'firebase-functions'
import {SendResults} from './SendResults'

/**
 * @summary Send email resilts to all users in the DB which have "resultsEmail" set to truefield in "emailAdresses"
 * 
 * @param url params "mids[]" as a string. example "?mids[]=xxx&mids[]=xxxx"
 */
export const emailResults = functions.https.onRequest(async (req, res) => {
const sendResults = new SendResults ();
const MatchIds:string[] = [];
req.query.mids.forEach(element => {
    MatchIds.push(element);
});

await sendResults.sendResultEmail(MatchIds)
    .then( sendResultsResponse => res.send(sendResultsResponse))
    .catch( err => res.send(err));
})