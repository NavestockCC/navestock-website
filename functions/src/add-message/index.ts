import * as functions from 'firebase-functions'

export const helloNavestock = functions.https.onRequest(async (req, res) => {
    console.info("Print: Hello from Navestock");
    res.send("Hello from Navestock!!!");
})