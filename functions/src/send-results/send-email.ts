import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';

/** Navestock Objects */
import {match} from '../objects/match.object';

/**
 * Configure the email transport using the default SMTP transport and a GMail account.
* For Gmail, enable these:
* 1. https://www.google.com/settings/security/lesssecureapps
* 2. https://accounts.google.com/DisplayUnlockCaptcha
* For other types of transports such as Sendgrid see https://nodemailer.com/transports/
* TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
* Set the gmail.email and gmail.password Google Cloud environment variables to match the email and password
* of the Gmail account used to send emails (or the app password if your account has 2-step verification enabled). 
* For this use:
* firebase functions:config:set gmail.email="myusername@gmail.com" gmail.password="secretpassword"
 */
 
export class SendResults {

// create reusable transporter object using SMTP transport    

private gmailEmail:any = functions.config().gmail.email;
private gmailPassword:any = functions.config().gmail.password;
private  mailTransport:any = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: this.gmailEmail,
    pass: this.gmailPassword
  },
});

constructor(private afs = admin.firestore()) {
}



// Sends a welcome email to the given user.
public sendResultEmail(matchArry:string[]):any {

    Promise.all([this.emailSubject(matchArry), this.emailBody(matchArry), this.emailTo()]).then( (res) => {
      const mailOptions = {
        from: 'navestockcc@gmail.com',
        to: res[2],
        subject: res[0],
        html: res[1]
      };
      return  this.mailTransport.sendMail(mailOptions);
    }).catch(
      err => { console.log('Oops could not send the email')
            return 'Oops could not send the email. EROR: ' + err;
            }
    )
}

/**
 * Generate emailSubject 
 */
private emailSubject(matchID:string[]):Promise<string>{
  let allmatchDataPromise: Promise<any>;
  let matchData: match = null;
  const matchDataPromise: Promise<admin.firestore.DocumentSnapshot>[] = [];
  const matchDates:Date[] = [];

  matchID.forEach(mid => {
    const p = this.afs.doc('Fixtures/' + mid).get();
    matchDataPromise.push(p); 
  });
  
  return new Promise( (resolve, reject) => {
  allmatchDataPromise = Promise.all(matchDataPromise);
  allmatchDataPromise.then(
    res => {
      res.forEach((mtch:any) =>{
        matchData = <match>mtch.data();
        matchDates.push(matchData.match_date);
      });
    resolve ('Navestock CC Match Results : ' + this.DateHeading(matchDates));
    }).catch(
      err => {
        reject('Opps somthing went wrong: ' + err)
      }
    )
  })
}


/**
 * Format Date
 */

 private DateHeading(dates: any): string {
  const month_names =["Jan","Feb","Mar", "Apr","May","Jun", "Jul","Aug","Sep", "Oct","Nov","Dec"];

  let firstDate:Date = undefined;
  let lastDate:Date = undefined;

  let firstDay:number = undefined;
  let lastDay:number = undefined;

  let firstMonth:number = undefined;
  let lastMonth:number = undefined;

  let firstYear:number = undefined;
  let lastYear:number = undefined;

  dates.forEach(eachDate => {
    if(firstDate === undefined || eachDate.toDate() < firstDate ){
      firstDate = eachDate.toDate();
    }

    if(lastDate === undefined || eachDate.toDate() > lastDate ){
      lastDate = eachDate.toDate();
    }

  });

  
    firstDay = firstDate.getDate();
    firstMonth = firstDate.getMonth();
    firstYear = firstDate.getFullYear();
  
    lastDay = lastDate.getDate();
    lastMonth = lastDate.getMonth();
    lastYear = lastDate.getFullYear();
  
    if(firstYear !== lastYear){
      return firstDay + " " + month_names[firstMonth] + " " + firstYear + " - " + lastDay + " " + month_names[lastMonth] + " " + lastYear; 
    } else if(firstMonth !== lastMonth){
      return firstDay + " " + month_names[firstMonth] + " " + firstYear + " - " + lastDay + " " + month_names[lastMonth] + " " + lastYear; 
    } else if(firstDay !== lastDay){
      return firstDay + " - " + lastDay + " " + month_names[firstMonth] + " " + firstYear;
    } else{
      return firstDay + " " + month_names[firstMonth] + " " + firstYear;
    }

 }


/**
 * Generate emailBody 
 * Get match records and generate HTML for email body.;
 */
private emailBody(matchID:string[]):Promise<any> {
  const matchDataPromise: Promise<admin.firestore.DocumentSnapshot>[] = [];
  let allmatchDataPromise: Promise<any>;
  let matchData: match = null;
  let emailHTML:string = null;

    matchID.forEach(mid => {
      const p = this.afs.doc('Fixtures/' + mid).get();
      matchDataPromise.push(p); 
    });
    
    return new Promise( (resolve, reject) => {
    allmatchDataPromise = Promise.all(matchDataPromise);
    allmatchDataPromise.then(
      res => {
        emailHTML = "<p><strong>Navestock Cricket Club Results</strong></p>";
        emailHTML = emailHTML + "<ol>";
            res.forEach((mtch:any) =>{
              matchData = <match>mtch.data();
        emailHTML =  emailHTML + "<li><a href='https://navestockcc.org/matchdetails/" + matchData.id + "' style='color: #000000; text-decoration: none;'>";
        emailHTML =  emailHTML + "<p><b>" + matchData.navestock_club_name + " " + matchData.navestock_team_name + " vs " + matchData.opposition_club_name + " " + matchData.opposition_team_name + "</b></p>";
        emailHTML =  emailHTML + "<p>" + matchData.result_description + "</p>";
        emailHTML =  emailHTML + "<p>" + matchData.match_notes + "</p>";
        emailHTML =  emailHTML + "<p> Click to see scorecard </p>";
        emailHTML =  emailHTML + "</a></li>";
      })// end for each

        emailHTML = emailHTML + "</ol>"
      } //response
    )//end allmatchDataPromise.then
    .then(res=>{
      resolve (emailHTML);
    }).catch(err => {
      reject(err);
    });
    }) // end Promise
    
}

/**
 * Generate array of email addresses to send emails to.
 * Pull email addresses from FireStore based on email addresses where resultsEmail field = true;
 */
private emailTo():Promise<string[]>{
  const BCCList:string[] = [];

  return new Promise( (resolve, reject) => {
    this.afs.collection('emailAdresses').where('resultsEmail', '==', true).get().then( emailList =>
      {emailList.forEach(person => {
          BCCList.push(person.data().emailaddress);
        })
      }).then( ()=> {
        resolve(BCCList);
      }).catch(
        err => {
            reject(err);
        });
  }); 
  }

}