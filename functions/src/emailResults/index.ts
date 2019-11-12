
import * as functions from 'firebase-functions';
import * as SendgridMailService from "@sendgrid/mail";

import {SendResults} from "./SendResults";



const SENDGRID_API_KEY: any = functions.config().sendgrid.key;
SendgridMailService.setApiKey(SENDGRID_API_KEY);

/**
 * @summary Send email resilts to all users in the DB which have "resultsEmail" set to truefield in "emailAdresses"
 * 
 * @param url params "mids[]" as a string. example "?mids[]=xxx&mids[]=xxxx"
 */
export const emailResults = functions.https.onRequest((req, res) => {
const sendResults = new SendResults();
const MatchIds:string[] = [];
req.query.mids.forEach(element => {
    MatchIds.push(element);
});
 
  sendResults.sendGridMailData(MatchIds)
    .then(
      mailDataResp => {
        SendgridMailService.send(mailDataResp)
          .then(
            result => {
              res.send("Mail sent check your inbox");
            }
          )
          .catch(
            err => {
              res.send("Oops somthing went wrong. Error" + err);
            }
          )
      })
    .catch(
      err => {
        res.send("Oops somthing went wrong. Error" + err);
      })
});
