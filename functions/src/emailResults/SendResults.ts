//import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';

/** Navestock Objects */
import { match } from '../objects/match.object';




// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
export class SendResults {
  gmailEmail: any = 'navestockcc@gmail.com' //functions.config().gmail.email;
  gmailPassword: any = 'NavestockCC1768'  //functions.config().gmail.password;
  mailTransport: any = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.gmailEmail,
      pass: this.gmailPassword
    },
  });

  constructor(private afs = admin.firestore()) {

  }

  // Your company name to include in the emails
  // TODO: Change this to your app or company name to customize the email sent.
  APP_NAME: string = 'Navestock CC Weekly Match Results';



  // Sends a welcome email to the given user.
  sendResultEmail(matchID: string[]): Promise<string> {
    let mailBody: string = null;
    let toList: string = null;
    let mailOptions: object = null;

    const sendEmailPromise = new Promise<string>((resolve, reject) => {

      Promise.all([this.emailBody(matchID), this.toAddressList()])
        .then(
          PARes => {
            // 1. Get the mailBoday and toList from the Promise functions "emailBody" and "toAddressList"
            mailBody = PARes[0];
            toList = PARes[1];
          }
        )
        .then(() => {
          //2. Generate the email
          mailOptions = {
            from: 'navestockcc@gmail.com',
            bcc: toList,
            subject: this.APP_NAME,
            html: mailBody
          };
          //3. Send the email
          this.mailTransport.sendMail(mailOptions, (err, info) => {
            if (info) {
              console.log(info.envelope);
              console.log(info.messageId);
            }
            if (err) {
              console.error(err);
            }
          })
          // 4. sendEmailPromise Reslove
          resolve(JSON.stringify(mailOptions))
        })

    }) // end sendEmailPromise creation

    return sendEmailPromise;
  }

  /**
   * @summary Return as a promise the list of email addresses to which emails must be sent
   * @returns Promise of thype String - list of email addresses.
   */
  public toAddressList(): Promise<string> {
    let emailAddressString:string = undefined;

    const emailAddressPromise = new Promise<string>((resolve, reject) => {

      this.afs.collection('emailAdresses').where('resultsEmail', '==' , true).get()
        .then(emlPromise => {
          emlPromise.forEach(item => {
            if(emailAddressString != undefined){
            emailAddressString += item.data().emailaddress + ", ";
          } else {
            emailAddressString = item.data().emailaddress + ", ";
          }
          })
        })
        .catch(err => console.error('ERROR: ' + err))
        .then(() => {
          if (emailAddressString != "") {
            resolve(emailAddressString.substring(0, emailAddressString.length - 2)); 
          }
          else {
            reject();
          }
        }
        )
    })
    return emailAddressPromise;
  }


  /**
   * @summary Construct the results email body
   * 
   * @param matchID - array of match id's, which results will be included int he email body
   */
  public emailBody(matchID: string[]): Promise<string> {
    const matchDataPromise: Promise<admin.firestore.DocumentSnapshot>[] = [];
    let matchData: match = null;
    let emailHTML: string = null;

    matchID.forEach(mid => {
      console.log('matchID: ' + mid);
      const p = this.afs.doc('Fixtures/' + mid).get();
      matchDataPromise.push(p);
    });

    const emailBodyPromise = new Promise<string>(function (resolve, reject) {

      emailHTML = "<p><strong>Navestock Cricket Club Results</strong></p>";
      emailHTML += "<ol>";

      Promise.all(matchDataPromise).then(
        res => {
          res.forEach(mtch => {
            matchData = <match>mtch.data();
            emailHTML += "<li>"
            emailHTML += "<p><b>" + matchData.navestock_club_name + " " + matchData.navestock_team_name + " vs " + matchData.opposition_club_name + " " + matchData.opposition_team_name + "</b></p>";
            emailHTML += "<p>" + matchData.result_description + "</p>";
            emailHTML += "<p>" + matchData.match_notes + "</p>";
            emailHTML += "<p><a href='https://navestockcc.org/matchdetails/" + matchData.id + "'>Click to see scorecard</a></p>";
            emailHTML += "</li>";
          })// end for each
        } //response
      )//end allmatchDataPromise.then
        .then(() => {
          emailHTML += "</ol>"
          console.log('emailHTML: ' + emailHTML);
          resolve(emailHTML)
        })
        .catch(err => {
          console.log(err)
          reject(err);
        });
    })
    return emailBodyPromise;
  }

}