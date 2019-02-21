
import * as functions from 'firebase-functions';
import {SendResults} from './send-email'


export const listener = functions.https.onRequest((req, res) => {
try {
    const mID: string[] = req.query.mid;
    const SR = new SendResults();
    res.send(SR.sendResultEmail(mID));
} 
catch (error) {
    res.send('error: Could not send email: ' + error);
}
});
