/**
 * 
 * Sending match results with Sendgrid Mail API v3
 * 
 */

import * as admin from "firebase-admin";
import * as SendgridMailData from '@sendgrid/helpers/classes/mail';

/** Navestock Objects */
import { match } from '../objects/match.object';


/**
 * Send results
 */
export class SendResults {

  constructor(private afs = admin.firestore()) {}


  /**
   * Params send results
   * @param matchID: string[]
   * @returns Sendgrid MailData object. 
   */

  public async  sendGridMailData(matchID: string[]):Promise<SendgridMailData.MailData>{
    return {
      templateId: 'd-0c2123f7476946959b736adc879157b6',
      substitutionWrappers: [
        '{{',
        '}}'
      ],
      from: {
        email: 'navestockcc@gmail.com',
        name: 'Navestock CC'
      },
      to: await this.toAddressList(),

      replyTo: {
        email: 'navestockcc@gmail.com',
        name: 'Navestock CC'
      },
      subject: 'Navestock CC Match Results',
      dynamicTemplateData: await this.emailDynamicTemplateData(matchID),
    };

  }

  /**
   * @summary Return  a object list of email addresses to which emails must be sent
   * @returns Array of email address objects "[{email: string, name:string }]".
   */
  private async toAddressList(): Promise<ToObject[]> {
    const toEmailAddresses: ToObject[] = [];

      await  this.afs.collection('emailAdresses').where('resultsEmail', '==', true).get()
      .then(emlPromise => {
          emlPromise.forEach(item => {
              toEmailAddresses.push({email: item.data().emailaddress, name: item.data().name });
          })
        })
        .catch(err => {
            console.error('ERROR: ' + err);
            return [{ email: 'lefras.coetzee@gmail.com', name: 'Lefras Coetzee'}]
            }
        )
        return toEmailAddresses; 
      }




  /**
   * @summary Construct the results email body
   * 
   * @param matchID - array of match id's, which results will be included int he email body
   */
  private async emailDynamicTemplateData(matchID: string[]): Promise<{[key: string]: any;}> {
    const matchDataPromise: Promise<admin.firestore.DocumentSnapshot>[] = [];
    let matchData: match = null;
    const teamResult: MatchDetail[] = [];
    let dynamicTemplateData: any = null;
    

    matchID.forEach(mid => {
      const p = this.afs.doc('Fixtures/' + mid).get();
      matchDataPromise.push(p);
    });

      await Promise.all(matchDataPromise).then(
        res => {
          res.forEach(mtch => {
            matchData = <match>mtch.data();
            teamResult.push(
              {
                navestock_club_name: matchData.navestock_club_name,
                navestock_team_name: matchData.navestock_team_name,
                opposition_club_name: matchData.opposition_club_name,
                opposition_team_name: matchData.opposition_team_name,
                match_date: this.stringDate(matchData.match_date),
                result_description: matchData.result_description,
                match_notes: matchData.match_notes,
                toss: matchData.toss,
                ground_name: matchData.ground_name,
                home_club_name: matchData.home_club_name,
                home_team_runs: matchData.home_team_runs.toString(),
                home_team_wickets: matchData.home_team_wickets.toString(),
                away_club_name: matchData.away_club_name,
                away_team_runs: matchData.away_team_runs.toString(),
                away_team_wickets: matchData.away_team_wickets.toString(),
                match_url: 'https://navestockcc.org/matchlist/' + matchData.id
              }
            )
          })// end for each
          dynamicTemplateData = {
            team: teamResult 
          };
        } //response
      )//end allmatchDataPromise.then
        .catch(err => {
          console.error(err)
        });

    return dynamicTemplateData;
  }



/**
 * String date function takes a Firebase timestamp object and returns a date string
 * @param matchdate :FirebaseFirestore.Timestamp
 * @returns string: 'ddd, d MMM YYYY' 
 */
private stringDate(matchdate: FirebaseFirestore.Timestamp):string{
  const tmpDate: Date = matchdate.toDate();
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const dotm: string = tmpDate.getDate().toString(); //get day of the month
  const yr: string = tmpDate.getFullYear().toString(); //get year
  const mnth: string = months[tmpDate.getMonth()]; //get Month as a string
  const dotw: string = days[tmpDate.getDay()]; //get day of the week string

  return dotw + ", " + dotm + " " + mnth + " " + yr;
}


}

interface ToObject {
  email: string,
  name: string
}

interface MatchDetail {
    navestock_club_name: string,
    navestock_team_name: string,
    opposition_club_name: string,
    opposition_team_name: string,
    match_date: string,
    result_description: string,
    match_notes: string,
    toss: string,
    ground_name: string,
    home_club_name: string,
    home_team_runs: string,
    home_team_wickets: string,
    away_club_name: string,
    away_team_runs: string,
    away_team_wickets: string,
    match_url: string
}