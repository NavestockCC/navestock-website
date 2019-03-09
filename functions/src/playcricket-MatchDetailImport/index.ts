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
          () => {res.send({'status' : 200});}
          )
        .catch(
            err => {res.send(err);}
          );
        
      }
    }
    catch (err) {
      res.send('error: Could not import PlayCricket Match')
    }

  });

})
