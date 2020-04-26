import * as functions from 'firebase-functions'

import * as cors from "cors";
import { PubSub } from "@google-cloud/pubsub";

import * as navestockCert from "../../environments/navestock-website-04b2617e4f2a";
const credentialsData ={
    projectId: navestockCert.firebaseAuthData.project_id,
    credentials: {
        "private_key": navestockCert.firebaseAuthData.private_key,
        "client_email": navestockCert.firebaseAuthData.client_email
        }
    };



const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: '*',
  preflightContinue: false
};
const Cors = cors(options);

export const listener = functions.https.onRequest(async (req, res) => {
  Cors(req, res, () => {
    try {
      if (req.query.mid === undefined) {
        res.send('mid param not found');
      } else {
        const mID: string = req.query.mid.toString();

        const pubSubClient = new PubSub(credentialsData);
        pubSubClient.topic('Match_Detail_Import_PubSub').publishJSON({"mid": mID})
            .then(
                pubSubPublisgResponse => {
                    console.log(`PubSub Message ${pubSubPublisgResponse} published to topic PlayCricket_Match_Details.`);
                    res.status(200).send('Match import started');
                })
            .catch(
                err => {
                  console.error('E_httpMatchDetailImport_1: PubSub Message Publish: ' + err)
                  res.status(400).send('error: Could not import PlayCricket Match')
                }
            );
      }
    }
    catch (err) {
      res.status(400).send('error: Could not import PlayCricket Match')
    }
  });
})
