import * as functions from 'firebase-functions';
import * as nodemailer from "nodemailer";
import * as admin from "firebase-admin";
import { google } from "googleapis";

/** Navestock Objects */
import { match } from '../objects/match.object';



/**
 *  Configure the email transport using the default SMTP transport and a GMail account.
 * For Gmail, enable these:
 * 1. https://www.google.com/settings/security/lesssecureapps
 * 2. https://accounts.google.com/DisplayUnlockCaptcha
 * For other types of transports such as Sendgrid see https://nodemailer.com/transports/
 * TODO: Configure the OAuth credentials 
 * Google Cloud environment variables with > sudo firebase functions:config:set gmail.email="navestockcc@gmail" gmail.clientid="?????????????.apps.googleusercontent.com" gmail.clientsecret="j-??????????" gmail.refreshtoken="?/??????-????" gmail.gmailredirecturl="https://us-central1-navestock-website.cloudfunctions.net"
 * To inspect what's currently stored in environment config for your project, you can use sudo firebase functions:config:get
 * Use oauthplayground to setup OAuth certificates https://developers.google.com/oauthplayground/
 * 
 */

export class SendResults {
  gmailEmail: any = functions.config().gmail.email;
  gmailAccesstoken: any = "";
  gmailRefreshtoken: any = functions.config().gmail.refreshtoken;
  gmailClientsecret: any = functions.config().gmail.clientsecret;
  gmailClientid: any = functions.config().gmail.clientid;
  gmailRedirectURL: any = functions.config().gmail.gmailredirecturl;
  gmailExpiryDate:any = "";


  constructor(private afs = admin.firestore()) {}

  // Your company name to include in the emails
  // TODO: Change this to your app or company name to customize the email sent.
  APP_NAME: string = 'Navestock CC Weekly Match Results';


  /**
   * @summary Create nodemailer Transporter.
   * @abstract nodemailer transportet is created with OAuth2 authentication. Credentials for the auth object are stored in functions.config()
   * 
   */
  private createMailTransport(): Promise<any> {

    const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    this.gmailClientid, // ClientID
    this.gmailClientsecret, // Client Secret
    this.gmailRedirectURL // Redirect URL
  );

    oauth2Client.setCredentials({
      refresh_token: this.gmailRefreshtoken
    });

    async () => await oauth2Client.getRequestHeaders().then(
      resp =>  {this.gmailAccesstoken = resp.Authorization.substring(7)}
    ).catch(
      err => console.error('Error: ' + err)
    );
    
    const MailTransport = new Promise<any>( (resolve, reject) =>{
      resolve(
        nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              type: 'OAuth2',
              user: this.gmailEmail,
              clientId: this.gmailClientid,
              clientSecret: this.gmailClientsecret,
              refreshToken: this.gmailRefreshtoken,
              accessToken: this.gmailAccesstoken,
              expires: 1484314697598
          }
      })
      )
    })
    
    
  return MailTransport;
  }

  /**
   * Function to create and send the results email. The function will:
   * 1. Get the mailBoday and toList from the Promise functions "emailBody" and "toAddressList"
   * 2. Generate the email
   * 3. Create nodemailer Transport object and Send the email
   * 4. Reslove sendResultEmail promise with email and nodemailer status
   * 
   * 
   * @param matchID - Array of matchId's which results will be sent
   */
  async sendResultEmail(matchID: string[]): Promise<string> {
    let mailBody: string = null;
    let toList: string = null;
    let mailOptions: object = null;


    const sendEmailPromise = new Promise<string>((resolve, reject) => {
      
      // 1. Get the mailBoday and toList from the Promise functions "emailBody" and "toAddressList"
      Promise.all([this.emailBody(matchID), this.toAddressList()])
        .then(
          PARes => {
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
          //3. Create nodemailer Transport object and Send the email
          this.createMailTransport().then( res => {
            res.sendMail(mailOptions, (error, response) => {
              if(error){console.log(error)}
              else {console.log(response)}

              res.close();
         });
          })
          .catch( err => {
            console.log(err);
          });

          // 4. sendEmailPromise Reslove
          resolve(JSON.stringify(mailOptions))
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });

    }) // end sendEmailPromise creation

    return sendEmailPromise;
  }

  /**
   * @summary Return as a promise the list of email addresses to which emails must be sent
   * @returns Promise of thype String - list of email addresses.
   */
  public toAddressList(): Promise<string> {
    let emailAddressString: string = undefined;

    const emailAddressPromise = new Promise<string>((resolve, reject) => {

      this.afs.collection('emailAdresses').where('resultsEmail', '==', true).get()
        .then(emlPromise => {
          emlPromise.forEach(item => {
            if (emailAddressString !== undefined) {
              emailAddressString += item.data().emailaddress + ", ";
            } else {
              emailAddressString = item.data().emailaddress + ", ";
            }
          })
        })
        .then(() => {
          if (emailAddressString !== undefined) {
            resolve(emailAddressString.substring(0, emailAddressString.length - 2));
          }
          else {
            reject();
          }
        }
        )
        .catch(err => console.error('ERROR: ' + err))
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
          resolve(emailHTML)
        })
        .catch(err => {
          console.error(err)
          reject(err);
        });
    })
    return emailBodyPromise;
  }

}