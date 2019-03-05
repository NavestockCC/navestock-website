import * as functions from 'firebase-functions'
import {AddMessage} from './add-message'

export const helloNavestock = functions.https.onRequest(async (req, res) => {
    const addMsg = new AddMessage();
    addMsg.getPlayCricketData('1234567890');
    res.send("Hello from Navestock");
})