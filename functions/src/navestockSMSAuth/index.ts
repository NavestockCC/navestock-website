import * as functions from 'firebase-functions'
import { NavestockSMSAuth } from './navestockSMSAuth'
import * as cors from "cors";

const options: cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: '*',
  preflightContinue: false
};
const Cors = cors(options);

export const navestockSMSAuth = functions.https.onRequest(async (req, res) => {
  const navestockSMSAuthFunction = new NavestockSMSAuth();
  Cors(req, res, () => {
    try {
      if (req.query.eml === undefined) {
        res.status(400).send('error: param not found');
      } else {
        const eMail: string = req.query.eml;

        navestockSMSAuthFunction.getPhoneforAuth(eMail)
          .then(respSnapshot => {
            if (respSnapshot.size === 1) {
              respSnapshot.forEach(respDoc => {
                res.status(200).send(respDoc.data().memberAuth);
              })
            }
            else { res.status(400).send('error: could not retreive phone number for auth') }
            /* 
                */
          })
          .catch(err => {
            res.status(400).send('error: Could retrieve phone number for authentication!! ' + err)
          });
      }
    }
    catch (err) {
      res.status(400).send('error: Could retrieve phone number for authentication!! ' + err)
    }
  })
})
