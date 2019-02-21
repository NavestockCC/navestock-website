// src/add-message/index.ts
import * as functions from 'firebase-functions'

export const listener = functions.https.onRequest(async (req, res) => {
    res.send("Hello from Navestock!")
})
