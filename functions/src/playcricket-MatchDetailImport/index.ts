import * as functions from 'firebase-functions'

import { MatchDetailImport } from './matchdetail-import';
import * as cors from "cors";

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
        const mID: string = req.query.mid;
        const matchImportFunction = new MatchDetailImport();
        Promise.all(matchImportFunction.getImportData(mID))
        .then(
            () => { 
              const respObject = {
                "status": "OK",
                "code": 200,
                "messages": "Import Completed",
            }
              res.send(respObject);
            }
          )
        .catch(
            err => {
              const respObject = {
                "status": "Error",
                "code": 400,
                "messages": err,
            }
              res.status(400).send(respObject);
            }
          );
        
      }
    }
    catch (err) {
      res.status(400).send('error: Could not import PlayCricket Match')
    }

  });

})
