import * as functions from 'firebase-functions'
import * as fb from 'firebase';
import {NavestockSMSAuth} from './navestockSMSAuth'
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
          if (req.query.eml === undefined || req.query.vc === undefined) {
            res.status(400).send('error: param not found');
          } else {
            const eMail: string = req.query.eml;
            const verificationCode = req.query.vc;

            navestockSMSAuthFunction.getPhoneforAuth(eMail)
                .then( resp => {
                    fb.auth().signInWithPhoneNumber(resp[0].memberAuth.phoneAuth , verificationCode)
                    .then(
                        signInSMSResp => { 
                            res.send(signInSMSResp.verificationId);
                        })
                        .catch( err => {
                            res.status(400).send('error: Could retrieve verification id')
                        });

                })
                .catch( err => {
                    res.status(400).send('error: Could retrieve phone number for authentication')
                  });
          }
        }
        catch (err) {
            res.status(400).send('error: Could retrieve phone number for authentication')
          } 
        })
        })
